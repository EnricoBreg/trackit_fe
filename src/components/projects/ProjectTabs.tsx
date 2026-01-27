import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import { Link, useMatchRoute } from "@tanstack/react-router";
import { FaRegComment } from "react-icons/fa6";
import { FiClipboard } from "react-icons/fi";
import { LuUser } from "react-icons/lu";

interface Props {
  projectId: string;
}

const ProjectTabs = ({ projectId }: Props) => {
  const matchRoute = useMatchRoute();

  const tabs = [
    {
      label: "Membri",
      path: `/app/projects/${projectId}/members`,
      icon: <FaRegComment />,
    },
    {
      label: "Task",
      path: `/app/projects/${projectId}/tasks`,
      icon: <FiClipboard />,
    },
    {
      label: "Commenti",
      path: `/app/projects/${projectId}/comments`,
      icon: <LuUser />,
    },
  ];

  return (
    <Box borderBottomWidth="1px" borderColor="gray.200">
      <HStack gap={0}>
        {tabs.map((tab) => {
          const isActive = matchRoute({ to: tab.path });

          return (
            <Link
              to={tab.path}
              params={{ projectId: projectId }}
              style={{ textDecoration: "none" }}
            >
              <Box
                px={6}
                py={3}
                borderBottomWidth="2px"
                borderBottomColor={isActive ? "blue.500" : "transparent"}
                color={isActive ? "blue.600" : "gray.600"}
                fontWeight={isActive ? "semibold" : "medium"}
                fontSize="sm"
                cursor="pointer"
                transition="all 0.2s"
                _hover={{
                  color: "blue.600",
                  bg: "gray.50",
                }}
              >
                <Flex alignItems="center" justify="center" gap={1}>
                  {tab.icon}
                  <Text>{tab.label}</Text>
                </Flex>
              </Box>
            </Link>
          );
        })}
      </HStack>
    </Box>
  );
};

export default ProjectTabs;
