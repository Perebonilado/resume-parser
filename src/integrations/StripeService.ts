import { PaymentError } from "@/errors/PaymentError";
import {
  InitiatePaymentDto,
  InitiatePaymentResponse,
  PaymentService,
} from "./PaymentService";

import { Stripe } from "stripe";

export class StripeService implements PaymentService {
  constructor() {
    this.provider = new Stripe(process.env.STRIPE_SECRET_KEY!);
  }

  private provider: Stripe;

  public async initiateOneTimePayment(
    dto: InitiatePaymentDto
  ): Promise<InitiatePaymentResponse> {
    try {
      const session = await this.provider.checkout.sessions.create({
        line_items: [
          {
            price: dto.productId,
            quantity: dto.productQuantity,
          },
        ],
        mode: "payment",
        success_url: `${process.env.NEXT_PUBLIC_BASE_URI}`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URI}`,
        customer_email: dto.customerEmail,
      });

      if (!session.url) {
        throw new PaymentError("Failed to generate payment link");
      }

      return {
        url: session.url,
      };
    } catch (error) {
      console.log(error)
      throw new PaymentError("Failed to initiate one time payment");
    }
  }
}
