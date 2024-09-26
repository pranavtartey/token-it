import { Button, Card, Heading, Text } from "@radix-ui/themes";
import { motion, AnimatePresence } from "framer-motion";

const CreateTokenForm = () => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 25, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { duration: 0.5 } }}
        exit={{ y: 25, opacity: 0, transition: { duration: 0.5 } }}
        className="min-h-screen flex justify-center items-center bg-gradient-to-tl from-slate-950 to-slate-700"
      >
        <Card>
          <Heading>Create Token Mint</Heading>
          <Text as="p">This is your token mint form component</Text>
          <Button>Next</Button>
          <Button>Skip</Button>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default CreateTokenForm;
