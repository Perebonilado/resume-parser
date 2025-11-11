import { useModalContext } from "@/contexts/ModalContext";
import Button from "../../@shared/ui/Button";
import { Coins } from "lucide-react";
import { FC } from "react";
import PriceCardContainer from "./PriceCardContainer";

interface Props {
  credits?: number;
}

const CreditsLeft: FC<Props> = ({ credits }) => {
  const { setModalContent } = useModalContext();
  return (
    <div className="flex items-center max-sm:flex-col-reverse gap-3 bg-gradient-to-r from-slate-50 to-gray-50 rounded-lg px-4 py-3 border border-gray-200 shadow-sm">
      <Button
        title="Purchase Credits"
        variant="outlined"
        size="small"
        onClick={() => {
          setModalContent(<PriceCardContainer />);
        }}
      />

      <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-md border border-gray-200">
        <div className="p-1.5 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600">
          <Coins className="w-4 h-4 text-white" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Credits Left
          </span>
          <span className="text-lg font-bold text-gray-900">
            {credits?.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CreditsLeft;
