import useAppTranslation from "@/hooks/useTranslation";
import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import { Link, useMatchRoute } from "@tanstack/react-router";
import { FaRegComment } from "react-icons/fa6";
import { FiClipboard } from "react-icons/fi";
import { LuUser } from "react-icons/lu";

interface Props {
  projectId: string;
}

const ProjectTabs = ({ projectId }: Props) => {
  const { t } = useAppTranslation();
  const matchRoute = useMatchRoute();

  const tabs = [
    {
      label: t("progetti.membri"),
      path: `/app/projects/${projectId}/members`,
      icon: <FaRegComment />,
    },
    {
      label: t("progetti.tasks"),
      path: `/app/projects/${projectId}/tasks`,
      icon: <FiClipboard />,
    },
    {
      label: t("progetti.commenti"),
      path: `/app/projects/${projectId}/comments`,
      icon: <LuUser />,
    },
  ];

  return (
    <Box borderBottomWidth="1px" borderColor="gray.200">
      <HStack gap={0}>
        {tabs.map((tab, index) => {
          const isActive = matchRoute({ to: tab.path });

          return (
            <Link
              key={index}
              to={tab.path}
              params={{ projectId: projectId }}
              style={{ textDecoration: "none" }}
            >
              <Box
                px={6}
                py={3}
                borderBottomWidth="2px"
                borderBottomColor={isActive ? "gray.500" : "transparent"}
                color={isActive ? "gray.800" : "gray.500"}
                fontWeight={isActive ? "semibold" : "medium"}
                fontSize="sm"
                cursor="pointer"
                transition="all 0.2s"
                _hover={{
                  color: "gray.600",
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
