import { Suspense, useState } from "react";
import "./App.css";
import { AnimatePresence, motion } from "framer-motion";
import { Outlet } from "react-router-dom";
import "@radix-ui/themes/styles.css";
import { Button, Theme, ThemePanel } from "@radix-ui/themes";
import Navbar from "./components/Navbar/Navbar";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

function App() {
  const [theme, setTheme] = useState(true);
  return (
    <>
      <Theme
        className=""
        accentColor="indigo"
        appearance={theme ? "dark" : "light"}
        grayColor="sand"
        radius="large"
      >
        <ConnectionProvider
          endpoint={
            "https://solana-devnet.g.alchemy.com/v2/CNAtFpCtGfjzf138vPcHDgRt9WFIj68s"
          }
        >
          <WalletProvider wallets={[]} autoConnect>
            <WalletModalProvider>
              <Navbar theme={theme} setTheme={setTheme} />
              <Suspense fallback={<div>Loding...</div>}>
                <AnimatePresence mode="wait">
                    <Outlet />
                </AnimatePresence>
              </Suspense>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </Theme>
    </>
  );
}

export default App;
