import { Box } from "@chakra-ui/react";
import { Link } from "@tanstack/react-router";

interface Props {
  to: string;
  children: React.ReactNode;
  callbackFn?: () => void;
  active?: boolean;
}

const NavLink = ({ to, children, callbackFn, active = false }: Props) => {
  return (
    <Box
      width={"full"}
      px={6}
      py={3}
      borderStartWidth="3px"
      borderStartColor={active ? "gray.500" : "transparent"}
      color={active ? "gray.800" : "gray.500"}
      fontWeight={active ? "bold" : "medium"}
      fontSize="md"
      cursor="pointer"
      transition="all 0.2s"
      _hover={{
        color: "gray.600",
        bg: "gray.50",
        borderStartColor: "gray.300",
      }}
      asChild
    >
      <Link to={to} onClick={callbackFn}>
        {children}
      </Link>
    </Box>
  );
};

export default NavLink;
