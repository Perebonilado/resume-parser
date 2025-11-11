export interface InitiatePaymentDto {
  productId: string;
  productQuantity: number;
  customerEmail: string;
}

export interface InitiatePaymentResponse {
  url: string;
}

export interface PaymentService {
  initiateOneTimePayment(dto: InitiatePaymentDto): Promise<InitiatePaymentResponse>;
}
