import { motion } from "framer-motion";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Box, Text } from "@radix-ui/themes";

const Navbar = ({ theme, setTheme }) => {
  return (
    <Box
      as="div"
      className="flex items-center absolute top-0 w-full h-20 px-6 backdrop-blur-md z-10"
    >
      <Text
        size={"8"}
        weight={"bold"}
        className="font-parisienne text-3xl bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent hover:cursor-default"
      >
        token-it
      </Text>
    </Box>
  );
};

export default Navbar;
