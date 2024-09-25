import { Suspense, useState } from "react";
import "./App.css";
import { AnimatePresence, motion } from "framer-motion";
import { Outlet } from "react-router-dom";
import "@radix-ui/themes/styles.css";
import { Button, Theme, ThemePanel } from "@radix-ui/themes";
import Navbar from "./components/Navbar/Navbar";

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
        <Navbar theme={theme} setTheme={setTheme} />
        <Suspense fallback={<div>Loding...</div>}>
          <Outlet />
        </Suspense>
      </Theme>
    </>
  );
}

export default App;
