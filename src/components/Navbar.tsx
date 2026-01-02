import { Image, Stack } from "@chakra-ui/react";
import MainMenu from "@/components/MainMenu";
import logoPlaceholder from "@/assets/palceholders/200x50.svg";

const Navbar = () => {
  return (
    <Stack
      paddingY={4}
      paddingX={2}
      justifyContent="space-between"
      direction={{ base: "row-reverse", md: "row" }}
    >
      <MainMenu />
      <Image src={logoPlaceholder} />
    </Stack>
  );
};

export default Navbar;
