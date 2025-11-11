import { NextApiRequest, NextApiResponse } from "next";
import { Stripe } from "stripe";
import { buffer } from "micro";
import { creditHandler } from "@/business/CreditHandler";
import { getCreditAmountByPlanId } from "@/lib";
import { withErrorHandler } from "@/lib/middleware/withErrorHandler";
import { compose } from "@/lib/middleware/compose";
import { withMethodCheck } from "@/lib/middleware/withMethodCheck";

type SuccessResponse = { received: true };
type ErrorResponse = { error: string };

export const config = {
  api: {
    bodyParser: false, 
  },
};

async function stripeWebhook(
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponse | SuccessResponse>
) {
  
  res.status(200).json({ received: true });

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-10-29.clover",
  });

  const buf = await buffer(req); 
  const sig = req.headers["stripe-signature"] as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("❌ Webhook signature verification failed:", err.message);
    return res.status(400).json({ error: `Webhook Error: ${err.message}` });
  }

  if (
    event.type === "checkout.session.completed" ||
    event.type === "checkout.session.async_payment_succeeded"
  ) {
    const session = event.data.object as Stripe.Checkout.Session;

    const checkoutSession = await stripe.checkout.sessions.retrieve(session.id, {
      expand: ["line_items"],
    });

    if (checkoutSession.payment_status !== "unpaid") {
      const customerEmail =
        checkoutSession.customer_email ||
        checkoutSession.customer_details?.email;

      if (!checkoutSession.line_items || !customerEmail) return res.status(400).json({ error: "Missing checkout data" });

      const lineItem = checkoutSession.line_items.data[0];
      if (!lineItem.price) return res.status(400).json({ error: "No price found" });

      const productId = lineItem.price.id;

      await creditHandler({
        email: customerEmail,
        mutationType: "increment",
        mutationValue: getCreditAmountByPlanId(productId),
      });
    }
  }

  return
}

export default compose(
  withErrorHandler,
  withMethodCheck(["POST"])
)(
  stripeWebhook as (req: NextApiRequest, res: NextApiResponse) => Promise<void>
);
