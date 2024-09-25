import { motion } from "framer-motion";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Box, Text } from "@radix-ui/themes";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import { useWallet } from "@solana/wallet-adapter-react";
import { useNavigate } from "react-router-dom";
const Navbar = ({ theme, setTheme }) => {
  const { connected, publickey } = useWallet();
  const navigate = useNavigate();
  const signinHandler = () => {
    navigate("signin");
  };
  return (
    <Box
      as="div"
      className="flex justify-between items-center absolute top-0 w-full h-20 px-6 backdrop-blur-md z-10"
    >
      <Text
        size={"8"}
        weight={"bold"}
        className="font-parisienne text-3xl bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent hover:cursor-default"
      >
        token-it
      </Text>
      <motion.div className="flex gap-3">
        {/* <motion.button onClick={() => setTheme(!theme)}>
          {theme ? <SunIcon /> : <MoonIcon />}
        </motion.button> */}
        {connected ? (
          <WalletMultiButton />
        ) : (
          <motion.button
            onClick={signinHandler}
            className="pt-2 pb-2 pr-4 pl-4 rounded-xl shadow-sm hover:border-2 duration-3000"
          >
            Sign in
          </motion.button>
        )}

        {/*  */}
      </motion.div>
    </Box>
  );
};

export default Navbar;
