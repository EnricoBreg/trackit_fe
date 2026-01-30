import { Avatar } from "@chakra-ui/react";

interface Props {
  name: string;
  imageSrc?: string;
  colorPalette?:
    | "gray"
    | "red"
    | "green"
    | "blue"
    | "teal"
    | "pink"
    | "purple"
    | "cyan"
    | "orange"
    | "yellow";
  shape?: "square" | "rounded" | "full";
  variant?: "solid" | "outline" | "subtle";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
}

const UserAvatar = ({
  name,
  imageSrc,
  colorPalette = "gray",
  shape = "full",
  variant = "solid",
  size = "md",
}: Props) => {
  return (
    <Avatar.Root
      colorPalette={colorPalette}
      shape={shape}
      variant={variant}
      size={size}
    >
      <Avatar.Fallback name={name} />
      <Avatar.Image src={imageSrc} />
    </Avatar.Root>
  );
};

export default UserAvatar;
