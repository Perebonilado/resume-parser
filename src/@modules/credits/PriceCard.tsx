import Button from "@/@shared/ui/Button";
import { useInitiatePaymentMutation } from "@/api-services/payment.service";
import { useLoadingSuccessAndError } from "@/hooks/useLoadingSuccessAndError";

interface PriceCardProps {
  id: string;
  title: string;
  description: string;
  price: string;
}

const PriceCard = ({ id, title, description, price }: PriceCardProps) => {
  const [initiatePayment, { isLoading, isError: error, isSuccess, data }] =
    useInitiatePaymentMutation();

  useLoadingSuccessAndError({
    error,
    errorMessage: "Failed to initiate payment",
    loading: isLoading,
    loadingMessage: "Initiating payment",
    isSuccess,
    onSuccess() {
      window.location.href = data!.successUrl;
    },
    successMessage: "Successful"
  });

  console.log(id)
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        ${price} - {title}
      </h3>
      <p className="text-sm text-gray-600 mb-6">{description}</p>
      <Button
        title="Purchase"
        variant="outlined"
        size="small"
        onClick={() => {
          initiatePayment({ productCount: 1, productId: id });
        }}
      />
    </div>
  );
};

export default PriceCard;
