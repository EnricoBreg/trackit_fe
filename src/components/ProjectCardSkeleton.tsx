import { Card, SkeletonText } from "@chakra-ui/react";

const ProjectCardSkeleton = () => {
  return (
    <Card.Root height="300px">
      <Card.Body gap={2}>
        <SkeletonText noOfLines={2} />
      </Card.Body>
    </Card.Root>
  );
};

export default ProjectCardSkeleton;
