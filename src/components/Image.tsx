import { Box, Image as ChakraImage } from "@chakra-ui/react";

interface Props {
  width?: string | number;
  height?: string | number;
  src: string;
}

const Image = ({ width = 200, height = 50, src: image }: Props) => {
  return (
    <Box width={width} height={height}>
      <ChakraImage src={image} />
    </Box>
  );
};

export default Image;
