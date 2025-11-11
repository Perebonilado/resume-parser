import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse } from "../upload";
import { withErrorHandler } from "@/lib/middleware/withErrorHandler";
import { compose } from "@/lib/middleware/compose";
import { Stripe } from "stripe";
import { withMethodCheck } from "@/lib/middleware/withMethodCheck";
import { creditHandler } from "@/business/CreditHandler";
import { getCreditAmountByPlanId } from "@/lib";

type SuccessResponse = {
  received: true;
};

async function stripeWebhook(
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponse | SuccessResponse>
) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const payload = req.body;
  const sig = req.headers["stripe-signature"]!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return res.status(400).json({ error: `Webhook Error: stripe` });
  }

  console.log(event);

  if (
    event.type === "checkout.session.completed" ||
    event.type === "checkout.session.async_payment_succeeded"
  ) {
    const sessionId = event.data.object.id;
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });

    if (checkoutSession.payment_status !== "unpaid") {
      const customerEmail =
        checkoutSession.customer_email ||
        checkoutSession.customer_details?.email;
      if (!checkoutSession.line_items) return;
      if (!customerEmail) return;
      const lineItem = checkoutSession.line_items.data[0];
      if (!lineItem.price) return;
      const productId = lineItem.price.id;

      creditHandler({
        email: customerEmail,
        mutationType: "increment",
        mutationValue: getCreditAmountByPlanId(productId),
      });
    }
  }
}

export default compose(
  withErrorHandler,
  withMethodCheck(["POST"])
)(
  stripeWebhook as (req: NextApiRequest, res: NextApiResponse) => Promise<void>
);
