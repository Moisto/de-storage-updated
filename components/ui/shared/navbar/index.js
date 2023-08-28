import { Button }from "@components/ui/shared/";
import Link from "next/link";
import { useState } from "react";


export default function Navbar() {
  // const {connect} = useWeb3()
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState(null);

  const handleClick = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0xa869' }],
      })
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
        params: [
          {
            chainId: "0xa869",
            chainName: "Fuji (C-Chain)",
            rpcUrls: ["https://api.avax-test.network/ext/C/rpc", "https://rpc.ankr.com/avalanche_fuji"],
            blockExplorerUrls: ["https://testnet.snowtrace.io"],
            nativeCurrency: {
              name: "",
              symbol: "AVAX",
              decimals: 18,
            },
          },
        ],
      });
      setIsConnected(true);
      const account = await accounts[0];
      setAccount(account);
      console.log(account);
   
      // console.log(account);
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
            await provider.request({
                method: 'wallet_addEthereumChain',
                params: [
                    {
                        chainId: '0xa869',
                        chainName: 'Fuji (C-Chain)',
                        nativeCurrency: {
                            name: 'AVAX',
                            symbol: 'AVAX',
                            decimals: 18,
                        },
                        rpcUrls: ['https://api.avax-test.network/ext/C/rpc', 'https://rpc.ankr.com/avalanche_fuji'],
                    },
                ],
            });
        } catch (addError) {
            // handle "add" error
            console.log(addError);
        }
      }
    }
  };


  const handleDisconnect = async () => {
    if (typeof window.ethereum !== "undefined") {
      alert("Are you sure you want to disconnect?");
      setIsConnected(false);
      setAccount(null);
    }
  };


  return (
    <>
      <div
        style={{ background: "rgba(160, 150, 150, 0.54)" }}
        className="flex justify-between items-center py-4 px-4 md:px-16   w-full h-auto m-auto   backdrop-blur-sm font-roboto"
      >
        <Link href="./">
          <p className="md:text-2xl text-white font-normal">
            <span style={{ color: "rgba(255, 255, 255, 0.8)" }}>De</span>Storage
          </p>
        </Link>

        {/* <Button className="px-4 py-2" >
          Connect wallet
        </Button> */}
        <button
          onClick={()=> handleClick()}
          className={`py-4 px-8 bg-circleRed rounded-tl-[30px] rounded-br-[30px] text-white text-sm font-normal font-poppins hover:bg-circleRedHover`}
        >
          Connect wallet
        </button>
      </div>
    </>
  );
}
