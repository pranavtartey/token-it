import { Box, Heading, Text } from "@radix-ui/themes";
import { motion, AnimatePresence } from "framer-motion";
import RequestAirdrop from "./RequestAirdrop";
import { useState } from "react";
import CreateTokenForm from "./CreateTokenForm";

const CreateToken = () => {
  const [requestAirdrop, setRequestAirdrop] = useState(true);

  return (
    <AnimatePresence mode="wait">
      {requestAirdrop ? (
        <motion.section
          key="requestAirdrop"
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { duration: 0.5 } }}
          exit={{ y: -25, opacity: 0, transition: { duration: 0.5 } }}
          className="min-h-screen flex justify-center items-center bg-gradient-to-tl from-slate-950 to-slate-700"
        >
          <RequestAirdrop
            requestAirdrop={requestAirdrop}
            setRequestAirdrop={setRequestAirdrop}
          />
        </motion.section>
      ) : (
        <motion.section
          key="createTokenForm"
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { duration: 0.5 } }}
          exit={{ y: -25, opacity: 0, transition: { duration: 0.5 } }}
          className="min-h-screen flex justify-center items-center bg-gradient-to-tl from-slate-950 to-slate-700"
        >
          <CreateTokenForm
            requestAirdrop={requestAirdrop}
            setRequestAirdrop={setRequestAirdrop}
          />
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default CreateToken;
