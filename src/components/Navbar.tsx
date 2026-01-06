import logoPlaceholder from "@/assets/placeholders/200x50.svg";
import MainMenu from "@/components/MainMenu";
import { Image, Stack } from "@chakra-ui/react";

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
