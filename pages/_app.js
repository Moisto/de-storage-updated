import "@styles/globals.css";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { avalancheFuji, mainnet } from "wagmi/chains";
import { MoralisProvider } from "react-moralis";
import { Web3ContextProvider } from "@components/context";

const chains = [avalancheFuji, mainnet];
const projectId = "6bbc02011d5eb02e1b5c0e419a50f246";

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

function App({ Component, pageProps }) {
  const Layout = Component.Layout;

  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <Web3ContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Web3ContextProvider>
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
}

export default App;
