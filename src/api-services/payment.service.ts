import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "@/constants";
import { secondsToMilliSeconds } from "@/lib";
import { PaymentDto } from "@/dto/PaymentDto";

interface PaymentResponse {
  successUrl: string;
}

export const PaymentService = createApi({
  reducerPath: "payment",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/api/payment`,
    timeout: secondsToMilliSeconds(3000),
  }),
  endpoints: (build) => ({
    initiatePayment: build.mutation<PaymentResponse, PaymentDto>({
      query: (body) => ({
        url: ``,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useInitiatePaymentMutation } = PaymentService;
