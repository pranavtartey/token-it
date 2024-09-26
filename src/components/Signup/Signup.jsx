import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Box, Card, Heading, Text } from "@radix-ui/themes";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const navigate = useNavigate();
  const backHandler = () => {
    navigate("/");
  };
  return (
    <AnimatePresence>
      <motion.section
        initial={{ y: 25, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { duration: 0.5 } }}
        exit={{ y: 25, opacity: 0, transition: { duration: 0.5 } }}
        className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-600 to-slate-950 "
      >
        <Card className="flex flex-col justify-center items-center w-9/12 h-96 md:w-6/12">
          <Heading align={"center"} className="text-gray-300 cursor-default">
            Connect Your Wallet
          </Heading>
          <Text className="mb-4" as="p" align={"center"}>
            <span className="font-parisienne text-3xl bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent cursor-default">
              token-it
            </span>
            <span className="text-gray-400 cursor-default">
              {" "}
              allows smooth signin using wallet
            </span>{" "}
          </Text>
          <WalletMultiButton />
          <motion.button className="mt-4" onClick={backHandler}>
            <ArrowLeftIcon />
          </motion.button>
        </Card>
      </motion.section>
    </AnimatePresence>
  );
};

export default Signup;
