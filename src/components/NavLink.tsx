import { Link as ChakraLink } from "@chakra-ui/react";
import { Link } from "@tanstack/react-router";

interface Props {
  to: string;
  children: React.ReactNode;
  callbackFn?: () => void;
}

const NavLink = ({ to, children, callbackFn }: Props) => {
  return (
    <ChakraLink asChild>
      <Link to={to} onClick={callbackFn}>
        {children}
      </Link>
    </ChakraLink>
  );
};

export default NavLink;
