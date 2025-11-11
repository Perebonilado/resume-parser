import PriceCard from "./PriceCard";
import CloseIcon from "@/icons/CloseIcon";
import { useModalContext } from "@/contexts/ModalContext";

const PriceCardContainer = () => {
  const priceOptions = [
    {
      id: process.env.STRIPE_PRICE_BASIC ?? "price_1SRvmV5ov2LNABUnMQVcEAxb",
      title: "Basic",
      description: "10,000 Credits",
      price: "10",
    },
    {
      id: process.env.STRIPE_PRICE_PRO ?? "price_1SRvpn5ov2LNABUnbjH4mSab",
      title: "Pro",
      description: "20,000 Credits",
      price: "20",
    },
  ];

  const { setModalContent } = useModalContext();

  return (
    <div className="bg-white rounded-xl p-6">
      <div className="flex justify-end">
        <button
          className="cursor-pointer"
          onClick={() => {
            setModalContent(null);
          }}
        >
          <CloseIcon />
        </button>
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Purchase Credits
        </h2>
        <p className="text-sm text-gray-600">
          Choose a plan that works for you
        </p>
      </div>

      <div className="flex items-center justify-center gap-4 flex-wrap">
        {priceOptions.map((option) => (
          <PriceCard
            key={option.id}
            id={option.id}
            title={option.title}
            price={option.price}
            description={option.description}
          />
        ))}
      </div>
    </div>
  );
};

export default PriceCardContainer;
