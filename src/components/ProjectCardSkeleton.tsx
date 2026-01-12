import {
  Badge,
  Box,
  Button,
  Card,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";

interface ProjectCardSkeletonProps {
  variant?: "subtle" | "outline" | "elevated";
}

const ProjectCardSkeleton = ({
  variant = "outline",
}: ProjectCardSkeletonProps) => {
  return (
    <Card.Root width="full" variant={variant}>
      <Card.Body gap="2">
        <Box>
          <Skeleton asChild loading>
            <Badge width={20}></Badge>
          </Skeleton>
        </Box>
        <Card.Title mb="2">
          <SkeletonText noOfLines={1} height={8} />
        </Card.Title>
        <Card.Description>
          <SkeletonText noOfLines={2} />
        </Card.Description>
      </Card.Body>
      <Card.Footer justifyContent="flex-end">
        <Skeleton asChild loading>
          <Button width="80px"></Button>
        </Skeleton>
      </Card.Footer>
    </Card.Root>
  );
};

export default ProjectCardSkeleton;
