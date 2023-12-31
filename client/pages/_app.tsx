import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import {
  arbitrum,
  goerli,
  mainnet,
  optimism,
  polygon,
  base,
  zora,
  polygonMumbai,
} from "wagmi/chains";
import { ModalProvider } from "../contexts/ModalContext";
import { publicProvider } from "wagmi/providers/public";
import Head from "next/head";
import { CrossmintProvider } from "@/contexts/CrossmintPayloadContext";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    zora,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
      ? [goerli]
      : [polygonMumbai]),
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Club_CPG_2024",
  projectId: "81a4cae2ffaa2831668db79217d52ba4",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>My page title</title>
        <meta
          property="og:Philippe Gonet"
          content="Philippe Gonet Mintpage"
          key="Philippe Gonet"
        />
      </Head>
      <div className="page-container">
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider theme={darkTheme()} chains={chains}>
            <ModalProvider>
              <CrossmintProvider>
                <Component {...pageProps} />
              </CrossmintProvider>
            </ModalProvider>
          </RainbowKitProvider>
        </WagmiConfig>
      </div>
    </>
  );
}

export default MyApp;
