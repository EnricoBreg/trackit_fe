import { Button, useClipboard } from "@chakra-ui/react";
import { FaCheck, FaRegCopy } from "react-icons/fa6";

interface Props {
  size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  value: string;
}

const Clipboard = ({ size = "sm", value }: Props) => {
  const { copied, copy } = useClipboard({ value });

  return (
    <Button variant="surface" size={size} onClick={copy}>
      {copied ? <FaCheck /> : <FaRegCopy />}
      {copied ? "Copied" : "Copy"}
    </Button>
  );
};

export default Clipboard;
