import { ArrowLeftIcon } from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Card,
  Heading,
  Tabs,
  Text,
  TextField,
} from "@radix-ui/themes";
import {
  createAssociatedTokenAccountInstruction,
  createInitializeInstruction,
  createInitializeMetadataPointerInstruction,
  createInitializeMintInstruction,
  createMintToInstruction,
  ExtensionType,
  getAssociatedTokenAddress,
  getAssociatedTokenAddressSync,
  getMintLen,
  LENGTH_SIZE,
  TOKEN_2022_PROGRAM_ID,
  TYPE_SIZE,
} from "@solana/spl-token";
import { BaseSignInMessageSignerWalletAdapter } from "@solana/wallet-adapter-base";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import { UploadClient } from "@uploadcare/upload-client";
import { useState } from "react";
import { toast } from "sonner";

const CreateTokenForm = ({ requestAirdrop, setRequestAirdrop }) => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [createTokenInputValue, setCreateTokenInputValue] = useState({
    name: "",
    symbol: "",
    decimals: 9,
    totalSupply: 1000000,
    description: "",
    image: "",
  });
  const [isCreating, setIsCreating] = useState(false);

  const client = new UploadClient({
    publicKey: import.meta.env.VITE_UPLOADCARE_PUBLIC_KEY,
  });

  const backHandler = () => {
    setRequestAirdrop(!requestAirdrop);
  };

  const createOffchainMetaData = async (name, symbol, description, image) => {
    console.log(
      "This is your token input value : ",
      JSON.stringify({
        name,
        symbol,
        description,
        image,
      })
    );
    //The key value pair from this JSON.stringify is created as when we pass the values for the variables names then the JSON.stringify will pick the variable names as keys and assign the values passed to them as values.
    const tokenMetadata = JSON.stringify({
      name, //name of the token
      symbol, //three letter symbol of the token
      description, //just some little bit of description
      image, //the image url that your wallet will dislay if it supports the offchain meta data
    });
    //This meta data is the offchain meta data and will be uploaded elase where and the wallets and explorers that want the off chain meta data that will go to the uri section of your mint and get this meta data and display the name symbol and image from there(this is not important) priority is always given to the onChain data and that is the permanent one
    const metadataFile = new File([tokenMetadata], "metadata.json", {
      type: "application/json",
    });
    try {
      const result = await client.uploadFile(metadataFile);
      console.log("File upload result data : ", result);
      return result.cdnUrl;
    } catch (error) {
      console.log("File upload failed : ", error);
      throw error;
    }
  };

  const createTokenHandler = async () => {
    //File upload in json format code

    //file upload to Uploadcare finish
    //Now this is code for creating the token

    try {
      setIsCreating(true);
      const mintKeypair = Keypair.generate();
      let offChainMetaDataUri = await createOffchainMetaData(
        createTokenInputValue.name,
        createTokenInputValue.symbol,
        createTokenInputValue.description,
        createTokenInputValue.image
      );
      const onChainMetaData = {
        mint: mintKeypair.publicKey,
        name: createTokenInputValue.name,
        symbol: createTokenInputValue.symbol,
        description: createTokenInputValue.description,
        uri: offChainMetaDataUri,
        additionalMetadata: [],
      };

      const mintLen = getMintLen([ExtensionType.MetadataPointer]);
      const packedMetaData = JSON.stringify(onChainMetaData);
      const metaDataLen = TYPE_SIZE + LENGTH_SIZE + packedMetaData.length;
      const lamports = await connection.getMinimumBalanceForRentExemption(
        mintLen + metaDataLen
      );

      const transaction = new Transaction().add(
        SystemProgram.createAccount({
          fromPubkey: wallet.publicKey,
          newAccountPubkey: mintKeypair.publicKey,
          space: mintLen,
          lamports,
          programId: TOKEN_2022_PROGRAM_ID,
        }),
        createInitializeMetadataPointerInstruction(
          mintKeypair.publicKey, //a public key that points to the account on blockchain who's metadata this pointer will point to
          wallet.publicKey, //It signifies the account that has permission to update the metadata associated with the mint. This wallet is responsible for managing and making changes to the metadata
          mintKeypair.publicKey, //This has to be the public key taht points to the saperate metadata account but as we are using the same mint account so we are providing the mintKeypair public in this field but it should have been the medadataAccount public key
          TOKEN_2022_PROGRAM_ID //program id for token standerd
        ),
        createInitializeMintInstruction(
          mintKeypair.publicKey, //public key of the token mint that is being created
          createTokenInputValue.decimals, //decimal values its tokens can be devided in
          wallet.publicKey, //mint authority that who can mint its tokens (paisa hi paisa hogaa)
          null, //freese authority means who can freeze this currency as agar kuch galat hota hai or hame pata lagta hai toh kon freeze kar sakta hai iski leni deni so this is null for our case so we promote the kala dhandha
          TOKEN_2022_PROGRAM_ID
        ),
        createInitializeInstruction({
          //this instruction initializes the on chain meta data
          programId: TOKEN_2022_PROGRAM_ID, //Metadata stored in the mint account
          metadata: mintKeypair.publicKey, // Authority to update the metadata
          updateAuthority: wallet.publicKey, // Authority to mint tokens -- iss metadata ko kon updateKarsakta hai
          mintAuthority: wallet.publicKey, // Public key of the mint account -- Iska mtlb hai ki iss metadata ka jo original mint account hai vo kiska hai uski sari authority kiski hai na ki ye vo mint authority hai ko iske tokens kon mint kar sakta hai (Quiet confusing)
          mint: mintKeypair.publicKey, // Token name
          name: onChainMetaData.name, // Token symbol
          symbol: onChainMetaData.symbol,
          uri: onChainMetaData.uri, // URI pointing to off-chain metadata
        })
      );

      transaction.feePayer = wallet.publicKey;
      transaction.recentBlockhash = (
        await connection.getLatestBlockhash()
      ).blockhash;
      transaction.partialSign(mintKeypair);

      console.log("hello I am before send transaction")

      await wallet.sendTransaction(transaction, connection);

      console.log("I am after send transaction")
      toast.success(
        `Token mint created at ${mintKeypair.publicKey.toBase58()}`
      );

      const associatedToken = getAssociatedTokenAddressSync(
        mintKeypair.publicKey, // Public key of the token mint (the mint account)
        wallet.publicKey, // Public key of the wallet that will hold the tokens
        false, // Set to false since we are not using a PDA (Program Derived Address)
        TOKEN_2022_PROGRAM_ID // Program ID for Token-2022 standard
      );

      toast.success(associatedToken.toBase58());

      const transaction2 = new Transaction().add(
        createAssociatedTokenAccountInstruction(
          wallet.publicKey,
          associatedToken,
          wallet.publicKey,
          mintKeypair.publicKey,
          TOKEN_2022_PROGRAM_ID
        ),
        createMintToInstruction(
          mintKeypair.publicKey,
          associatedToken,
          wallet.publicKey,
          createTokenInputValue.totalSupply *
            Math.pow(10, createTokenInputValue.decimals),
          [],
          TOKEN_2022_PROGRAM_ID
        )
      );

      await wallet.sendTransaction(transaction2, connection);
      setCreateTokenInputValue({
        name: "",
        symbol: "",
        decimals: 9,
        totalSupply: 1000000,
        description: "",
        image: "",
      });

      console.log(
        "This is the associated token account address for your wallet and your token mint : ",
        associatedToken
      );

      console.log(
        "This is your mint public key : ",
        mintKeypair.publicKey.toBase58()
      );
      toast.success("Token is created Successfully!");
      setIsCreating(false);
    } catch (error) {
      console.log("Something went wrong in createTokenHandler : ", error);
      toast.error("An unexpected error occurred.");
    }
  };
  //   Mint Initialization (createInitializeMintInstruction): The mintAuthority gives the designated wallet the right to mint tokens.
  // Metadata Initialization (createInitializeInstruction): The mintAuthority ensures that the same wallet has the power to update the metadata related to the token mint, ensuring consistent control over both the minting and the metadata.

  const changeHandler = (event) => {
    const { name, value } = event.target;
    console.log(`${name} : ${value}`);
    setCreateTokenInputValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <Card>
      <button onClick={backHandler}>
        <ArrowLeftIcon />
      </button>
      <div className="flex flex-col justify-center items-center">
        <Tabs.Root defaultValue="createToken">
          <Tabs.List>
            <Tabs.Trigger value="createToken">Create Token</Tabs.Trigger>
            <Tabs.Trigger value="manageToken">Manage Token</Tabs.Trigger>
            <Tabs.Trigger value="sendToken">Send Token</Tabs.Trigger>
          </Tabs.List>

          <Box pt="3">
            <Tabs.Content value="createToken">
              <Text size={"1"} className="text-gray-400 cursor-default">
                Token Name
              </Text>
              <TextField.Root
                onChange={changeHandler}
                name="name"
                value={createTokenInputValue.name}
                placeholder="Enter the name of your token..."
              />
              <Text size={"1"} className="text-gray-400 cursor-default">
                Symbol
              </Text>
              <TextField.Root
                onChange={changeHandler}
                name="symbol"
                value={createTokenInputValue.symbol}
                placeholder="Enter the name of your token..."
              />
              <Text size={"1"} className="text-gray-400 cursor-default">
                Decimals
              </Text>
              <TextField.Root
                onChange={changeHandler}
                name="decimals"
                type="number"
                value={createTokenInputValue.decimals}
                placeholder="Enter the name of your token..."
              />
              <Text size={"1"} className="text-gray-400 cursor-default">
                Total Supply
              </Text>
              <TextField.Root
                onChange={changeHandler}
                name="totalSupply"
                type="number"
                value={createTokenInputValue.totalSupply}
                placeholder="Enter the name of your token..."
              />
              <Text size={"1"} className="text-gray-400 cursor-default">
                Description
              </Text>
              <TextField.Root
                onChange={changeHandler}
                name="description"
                value={createTokenInputValue.description}
                placeholder="Enter the name of your token..."
              />
              <Text size={"1"} className="text-gray-400 cursor-default">
                Image URI
              </Text>
              <TextField.Root
                onChange={changeHandler}
                name="image"
                value={createTokenInputValue.image}
                placeholder="Enter the name of your token..."
              />
              <div className="flex justify-center items-center mt-4">
                <Button disabled={isCreating} onClick={createTokenHandler}>
                  Create Token
                </Button>
              </div>
            </Tabs.Content>

            <Tabs.Content value="manageToken">
              <Text size="2">Access and update your documents.</Text>
            </Tabs.Content>

            <Tabs.Content value="sendToken">
              <Text size="2">
                Edit your profile or update contact information.
              </Text>
            </Tabs.Content>
          </Box>
        </Tabs.Root>
        {/* <div className="flex gap-3">
          <Button>Next</Button>
          <Button>Skip</Button>
        </div> */}
      </div>
    </Card>
  );
};

export default CreateTokenForm;
