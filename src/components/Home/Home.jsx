import { Button, Container, Heading, Text } from "@radix-ui/themes";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import cloudBitcoinImage from "../../assets/cloud-bitcoin.png";
import bitcoinStonksImage from "../../assets/bitcoin-stonks.png";
import bitcoinBankImage from "../../assets/bitcoin-bank.png";

const Home = () => {
  const navigate = useNavigate();
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };
  const features = [
    {
      title: "Fast and Scalable",
      description:
        "Leverage the lightning-fast transaction speeds and low fees of the Solana blockchain for a seamless token creation experience.",
    },
    {
      title: "Easy Token Creation",
      description:
        "With just a few clicks, create your own token mint. No coding required.",
    },
    {
      title: "Effortless Token Minting",
      description: "Mint tokens in real-time and view your balances instantly.",
    },
    {
      title: "Secure and Transparent",
      description:
        "Built on Solana, Token-It ensures the highest level of security for all token creation and minting operations.",
    },
    {
      title: "Solana Ecosystem Integration",
      description:
        "Fully integrated with Solana's ecosystem, making it easy to connect your wallet and start managing tokens.",
    },
  ];

  return (
    <AnimatePresence>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-gradient-to-tl from-blue-500 flex flex-col justify-center items-center"
      >
        <motion.div
          className="flex flex-col items-center text-center"
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Container className="p-4">
            <Heading size="3xl" className="text-white font-bold">
              Create & Mint Tokens Effortlessly on Solana
            </Heading>
          </Container>
          <Container className="p-4">
            <Text as="p" className="text-white text-lg max-w-md">
              Token-It empowers you to create your own token mints and mint
              tokens with ease, powered by the speed and efficiency of Solana.
            </Text>
          </Container>
          {/* <motion.img animate={{rotate:360}} className="absolute top-6 left-3 h-48" alt="cloud-bitcoin-image" src={cloudBitcoinImage} /> */}
        </motion.div>
        <motion.div
          className="flex justify-center items-center gap-4 mt-8"
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Button className="bg-white text-blue-500 font-semibold px-6 py-3 rounded-lg  hover:bg-blue-100">
            Create a Token Mint
          </Button>
          <Button className="bg-white text-blue-500 font-semibold px-6 py-3 rounded-lg hover:bg-blue-100">
            Mint Your Token
          </Button>
        </motion.div>
      </motion.section>
      <motion.section className="min-h-screen bg-gray-100 dark:bg-gray-900 py-16">
        <Container className="text-center mb-12">
          <Heading
            size="2xl"
            className="font-bold text-blue-600 dark:text-blue-400 mb-4"
          >
            Why Choose Token-It?
          </Heading>
          <Text className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Token-It offers unparalleled speed, security, and ease-of-use for
            token creation and minting on Solana.
          </Text>
        </Container>

        <motion.ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-8 max-w-5xl mx-auto">
          {features.map((feature, index) => {
            const { ref, inView } = useInView({
              triggerOnce: true,
              threshold: 0.2,
            });

            return (
              <motion.li
                key={index}
                ref={ref}
                variants={fadeInUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <Text
                  weight="bold"
                  className="text-xl text-blue-600 dark:text-blue-400"
                >
                  {feature.title}
                </Text>
                <br />
                <Text className="text-gray-600 dark:text-gray-300 mt-2">
                  {feature.description}
                </Text>
              </motion.li>
            );
          })}
        </motion.ol>
      </motion.section>
      <motion.section className="min-h-screen bg-white dark:bg-gray-900 py-16">
        <Container className="text-center mb-12">
          <Heading
            size="2xl"
            className="font-bold text-blue-600 dark:text-blue-400 mb-6"
          >
            How It Works
          </Heading>
          <Text className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Follow these easy steps to create and manage your tokens on Solana.
          </Text>
        </Container>

        {/* Step List */}
        <motion.ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-8 max-w-5xl mx-auto">
          <motion.li
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <Text
              weight="bold"
              className="text-xl text-blue-600 dark:text-blue-400"
            >
              Step 1: Connect Your Wallet
            </Text>
            <br />
            <Text className="text-gray-600 dark:text-gray-300 mt-2">
              Get started by connecting your Solana wallet. We support all major
              Solana wallets.
            </Text>
          </motion.li>

          <motion.li
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <Text
              weight="bold"
              className="text-xl text-blue-600 dark:text-blue-400"
            >
              Step 2: Create a Token Mint
            </Text>
            <br />
            <Text className="text-gray-600 dark:text-gray-300 mt-2">
              Define your token properties like name, symbol, and supply, and
              create your own token mint.
            </Text>
          </motion.li>

          <motion.li
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <Text
              weight="bold"
              className="text-xl text-blue-600 dark:text-blue-400"
            >
              Step 3: Mint Tokens
            </Text>
            <br />
            <Text className="text-gray-600 dark:text-gray-300 mt-2">
              Mint the desired amount of tokens with the press of a button.
              Instantly view them in your wallet.
            </Text>
          </motion.li>

          <motion.li
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <Text
              weight="bold"
              className="text-xl text-blue-600 dark:text-blue-400"
            >
              Manage Your Tokens
            </Text>
            <br />
            <Text className="text-gray-600 dark:text-gray-300 mt-2">
              Monitor your tokens, check balances, and view transaction history
              all in one place.
            </Text>
          </motion.li>
        </motion.ol>
      </motion.section>
      {/* Start Creating Your Tokens Today */}
      <motion.section className=" bg-gradient-to-r from-blue-500 to-blue-700 py-8 sm:py-16">
  <Container className="text-center max-w-lg sm:max-w-2xl md:max-w-4xl mx-auto px-4">
    <Heading
      className="font-bold text-white mb-4 sm:mb-6 text-xl sm:text-4xl md:text-5xl"
      animate={{ opacity: 1 }}
    >
      Start Creating Your Tokens Today
    </Heading>
    <Text
      as="p"
      className="text-sm sm:text-xl text-white mb-6 sm:mb-8 max-w-md sm:max-w-lg md:max-w-xl mx-auto"
    >
      Whether you're a project owner, developer, or crypto enthusiast, Token-It makes token creation simple.
    </Text>
    <Button
      className="bg-white text-blue-500 font-semibold px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-blue-100"
      onClick={() => navigate("/create-token")}
    >
      Create a Token Mint Now
    </Button>
  </Container>
</motion.section>


      {/* Frequently Asked Questions */}
      <motion.section className="min-h-screen bg-gray-100 dark:bg-gray-900 py-16">
        <Container className="text-center max-w-5xl mx-auto mb-12">
          <Heading
            size="2xl"
            className="font-bold text-blue-600 dark:text-blue-400 mb-6"
          >
            Frequently Asked Questions
          </Heading>
          <Text className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
            We've compiled the most common questions to help you get started
            with Token-It and Solana token creation.
          </Text>
        </Container>

        <motion.ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-8 max-w-5xl mx-auto">
          <motion.li
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            <Heading
              size="lg"
              className="text-blue-600 dark:text-blue-400 mb-2"
            >
              What is a Token Mint?
            </Heading>
            <Text className="text-gray-600 dark:text-gray-300">
              A token mint is the unique contract on the blockchain that
              represents the ability to create and manage tokens.
            </Text>
          </motion.li>

          <motion.li
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            <Heading
              size="lg"
              className="text-blue-600 dark:text-blue-400 mb-2"
            >
              Do I need a Solana Wallet to use Token-It?
            </Heading>
            <Text className="text-gray-600 dark:text-gray-300">
              Yes, you need a Solana-compatible wallet like Phantom or Backpack
              to create and mint tokens.
            </Text>
          </motion.li>

          <motion.li
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            <Heading
              size="lg"
              className="text-blue-600 dark:text-blue-400 mb-2"
            >
              What are the costs involved?
            </Heading>
            <Text className="text-gray-600 dark:text-gray-300">
              Thanks to Solana's low transaction fees, creating and minting
              tokens costs only a small fraction of a dollar.
            </Text>
          </motion.li>
        </motion.ul>
      </motion.section>
    </AnimatePresence>
  );
};

export default Home;
