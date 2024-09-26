import { Button, Card, Heading, Text } from "@radix-ui/themes";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState } from "react";

const RequestAirdrop = ({ requestAirdrop, setRequestAirdrop }) => {
  const [airdropMessage, setAirdropMessage] = useState("");
  const [requestingAirdrop, setRequestingAirdrop] = useState(false);
  const { connection } = useConnection();
  const wallet = useWallet();

  const airdropRequestHandler = async () => {
    setRequestingAirdrop(true);
    setAirdropMessage("Requesting Airdrop of 1 SOL");
    try {
      const signature = await connection.requestAirdrop(
        wallet?.publicKey,
        1 * LAMPORTS_PER_SOL
      );
      setAirdropMessage("Airdrop successful! 1 SOL credited");
      setRequestingAirdrop(false);
    } catch (error) {
      setAirdropMessage("Something went wrong");
      console.log("Something went wrong in the airdrop request : ", error);
    }
  };

  const nextHandler = () => {
    setRequestAirdrop(!requestAirdrop);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-tl from-slate-950 to-slate-700">
      <Card className="h-60 flex flex-col justify-center items-center">
        <Heading align={"center"} className="text-gray-300 cursor-default">
          Request Airdrop
        </Heading>
        <Text
          as="p"
          align={"center"}
          className="text-gray-400 cursor-default mb-4"
        >
          Low on SOL balance? We got you covered!
        </Text>
        <div className="flex justify-center items-center gap-2 mb-4">
          <Button disabled={requestingAirdrop} onClick={airdropRequestHandler}>
            Request Airdrop
          </Button>
          <Button onClick={nextHandler}>Next</Button>
        </div>
        <Text>{airdropMessage}</Text>
      </Card>
    </div>
  );
};

export default RequestAirdrop;
