import { PaymentDto } from "@/dto/PaymentDto";
import { ValidationError } from "@/lib/middleware/withErrorHandler";

export function validatePaymentDto(body: any): PaymentDto {
  const errors: string[] = [];

  if (!body.productId || typeof body.productId !== "string") {
    errors.push("product id is required and must be a string");
  }

  if (!body.productCount || typeof body.productCount !== "number") {
    errors.push("product count is required and must be a number");
  }

  if (errors.length > 0) {
    throw new ValidationError(errors.join(", "));
  }

  return <PaymentDto>{
    productCount: body.productCount,
    productId: body.productId,
  };
}
