import type { NextApiRequest, NextApiResponse } from "next";
import { withAuth, AuthenticatedRequest } from "@/lib/middleware/withAuth";
import { withErrorHandler } from "@/lib/middleware/withErrorHandler";
import { withMethodCheck } from "@/lib/middleware/withMethodCheck";
import { compose } from "@/lib/middleware/compose";
import { ErrorResponse } from "./upload";
import { validatePaymentDto } from "@/validation/paymentValidationSchema";
import { PaymentService } from "@/integrations/PaymentService";
import { StripeService } from "@/integrations/StripeService";

type SuccessResponse = {
  successUrl: string;
};

async function initiatePayment(
  req: AuthenticatedRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
) {
  const dto = validatePaymentDto(req.body);
  const userEmail = req.userEmail;

  const paymentProvider: PaymentService = new StripeService();

  const data = await paymentProvider.initiateOneTimePayment({
    customerEmail: userEmail,
    productId: dto.productId,
    productQuantity: dto.productCount,
  });

  return res.status(200).json({ successUrl: data.url });
}

export default compose(
  withErrorHandler,
  withMethodCheck(["POST"]),
  withAuth
)(
  initiatePayment as (
    req: NextApiRequest,
    res: NextApiResponse
  ) => Promise<void>
);
