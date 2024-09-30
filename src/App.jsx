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
import { Toaster } from "sonner";

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
          endpoint={import.meta.env.VITE_ALCHEMY_SOLANA_DEVNET_URL}
        >
          <WalletProvider wallets={[]} autoConnect>
            <WalletModalProvider>
              <Navbar theme={theme} setTheme={setTheme} />
              <Suspense fallback={<div>Loding...</div>}>
                <Toaster richColors />
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
