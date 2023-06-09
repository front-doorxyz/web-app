import { Chat } from "@pushprotocol/uiweb";
import { useAccount, useSigner } from "wagmi";
import { hardhat } from "wagmi/chains";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/outline";
import { SwitchTheme } from "~~/components/SwitchTheme";
import { Faucet } from "~~/components/scaffold-eth";
import { useGlobalState } from "~~/services/store/store";
import { getTargetNetwork } from "~~/utils/scaffold-eth";

/**
 * Site footer
 */
export const Footer = () => {
  const nativeCurrencyPrice = useGlobalState(state => state.nativeCurrencyPrice);
  const { data: signer } = useSigner();
  const { address } = useAccount();
  return (
    <div className="min-h-0 p-5 mb-11 lg:mb-0">
      <div>
        <div className="fixed flex justify-between items-center w-full z-20 p-4 bottom-0 right-0 pointer-events-none 	">
          {/* <div className="flex space-x-2 pointer-events-auto">
            {nativeCurrencyPrice > 0 && (
              <div className="btn btn-primary btn-sm font-normal cursor-auto">
                <CurrencyDollarIcon className="h-4 w-4 mr-0.5" />
                <span>{nativeCurrencyPrice}</span>
              </div>
            )}
            {getTargetNetwork().id === hardhat.id && <Faucet />}
          </div> */}
          <SwitchTheme className="pointer-events-auto 	" />
          {signer && address && (
            <Chat
              account={address} //user address
              supportAddress="0xf35239d2c73c1f0e1E5ee8D174E0479a4040c26C" //support address
              signer={signer}
            />
          )}
        </div>
      </div>
    </div>
  );
};
