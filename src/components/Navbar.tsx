import logo from "@/assets/images/Track_IT__logo.png";
import MainMenu from "@/components/MainMenu";
import { Stack } from "@chakra-ui/react";
import Image from "./Image";

const Navbar = () => {
  return (
    <Stack
      paddingY={4}
      paddingX={2}
      justifyContent="space-between"
      direction={{ base: "row-reverse", md: "row" }}
    >
      <div>
        <MainMenu />
        {/* <ColorModeButton /> */}
      </div>
      <Image width={200} height={50} src={logo} />
    </Stack>
  );
};

export default Navbar;
