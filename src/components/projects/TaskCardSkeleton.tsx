import { Badge, Card, HStack, Skeleton, SkeletonText } from "@chakra-ui/react";

const TaskCardSkeleton = () => {
  return (
    <Card.Root width="full" variant="outline">
      <Card.Body gap="2">
        <HStack>
          <SkeletonText noOfLines={1} height={8} width="1/2" />
          <HStack gap={2}>
            <Skeleton asChild loading>
              <Badge width={20}></Badge>
            </Skeleton>
            <Skeleton asChild loading>
              <Badge width={20}></Badge>
            </Skeleton>
          </HStack>
        </HStack>
        <Card.Description>
          <SkeletonText noOfLines={2} height={4} />
        </Card.Description>

        <SkeletonText noOfLines={1} height={3} width="1/5" />
      </Card.Body>
    </Card.Root>
  );
};

export default TaskCardSkeleton;
