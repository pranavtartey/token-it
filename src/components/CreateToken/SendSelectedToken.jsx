import { Button, Heading, Text, TextField } from "@radix-ui/themes";
import {
  createAssociatedTokenAccountInstruction,
  createTransferInstruction,
  getAssociatedTokenAddressSync,
  TOKEN_2022_PROGRAM_ID,
} from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction } from "@solana/web3.js";
import { useState } from "react";
import { toast } from "sonner";

const SendSelectedToken = ({ token }) => {
  const { wallet } = useWallet();
  const { connection } = useConnection();
  const [inputValue, setInputValue] = useState({
    recipientAddress: "",
    amount: 0,
  });
  const [isTransfering, setIsTransfering] = useState(false);

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setInputValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const transferTokenHandler = async () => {
    setIsTransfering(true);
    try {
      const mintPublicKey = new PublicKey(token?.mintAddress);
      const recipientPublickey = new PublicKey(inputValue?.recipientAddress);

      //find or create the recipient's associated token account
      const recipientTokenAccount = getAssociatedTokenAddressSync(
        mintPublicKey, // The public key of the token mint
        recipientPublickey, // The recipient's public key
        false, // Set to false as we are not using a PDA
        TOKEN_2022_PROGRAM_ID // Program ID for the Token-2022 standard
      );

      const sourceTokenAccount = getAssociatedTokenAddressSync(
        mintPublicKey,
        wallet.publicKey,
        false,
        TOKEN_2022_PROGRAM_ID
      );

      // Ensure the recipient's associated token account is created

      const transaction = new Transaction().add(
        createAssociatedTokenAccountInstruction(
          wallet.publickey, // Payer: The wallet that will pay for creating the associated token account
          recipientTokenAccount, // The recipient's associated token account
          recipientPublickey, // Owner: The recipient of the token
          token.mintAddress, // The mint's public key
          TOKEN_2022_PROGRAM_ID // Program ID for Token-2022
        ),
        createTransferInstruction(
          sourceTokenAccount, // The sender's associated token account
          recipientTokenAccount, // The recipient's associated token account
          wallet.publicKey, // The sender's public key
          inputValue.amount * Math.pow(10, 5), // Amount of tokens to send, adjusted for decimals
          [], // multiple signers
          TOKEN_2022_PROGRAM_ID // Program ID for Token-2022
        )
      );

      transaction.feePayer = wallet.publicKey;
      transaction.recentBlockhash = (
        await connection.getLatestBlockhash()
      ).blockhash;
      await wallet.sendTransaction(transaction, connection);

      toast.success(`Successfully sent ${amount} tokens to ${recipient}`);
    } catch (error) {
      console.log("Something went wrong in the transferTokenHandler : ", error);
    }

    setIsTransfering(false);
  };
  return (
    <>
      <Heading align={"center"}>Transfer Token</Heading>
      <Text as="label" className="text-gray-400 cursor-default" size={"1"}>
        Recipient Address
      </Text>
      <TextField.Root
        name="recipientAddress"
        value={inputValue.recipientAddress}
        onChange={changeHandler}
        type="text"
        placeholder="Enter recipient address..."
      />
      <Text as="label" className="text-gray-400 cursor-default" size={"1"}>
        Amount
      </Text>
      <TextField.Root
        className="mb-4"
        name="amount"
        value={inputValue.amount}
        onChange={changeHandler}
        type="number"
        placeholder="Enter transfer amount..."
      />
      <div className="flex justify-center items-center">
        <Button disabled={isTransfering} onClick={transferTokenHandler}>
          Transfer Funds
        </Button>
      </div>
    </>
  );
};

export default SendSelectedToken;
