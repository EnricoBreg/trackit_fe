import type ProjectMember from "@/domain/entities/ProjectMember";
import useAppTranslation from "@/hooks/useTranslation";
import { getUserDisplayName } from "@/utils/users-utils";
import {
  Button,
  Card,
  HStack,
  Menu,
  MenuContent,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link } from "@tanstack/react-router";
import { FiMail } from "react-icons/fi";
import { HiOutlineUserRemove } from "react-icons/hi";
import { RiProfileLine } from "react-icons/ri";
import UserAvatar from "../UserAvatar";

interface Props {
  member: ProjectMember;
}

const MemberCard = ({ member: { user, role } }: Props) => {
  const { t } = useAppTranslation();

  return (
    <Menu.Root>
      <Menu.ContextTrigger width="full">
        <Card.Root key={user.id} variant="outline">
          <Card.Body>
            <HStack justify="space-between">
              <HStack gap={4}>
                <UserAvatar name={getUserDisplayName(user)} />
                <VStack align="start" gap={1}>
                  <Text fontWeight="semibold" fontSize="md">
                    {getUserDisplayName(user)}
                  </Text>
                  <Text color="gray.600" fontSize="sm">
                    {role.displayName}
                  </Text>
                </VStack>
              </HStack>
              <HStack gap={2} color="gray.500">
                <FiMail />
                <Text fontSize="sm">{user.email}</Text>
              </HStack>
            </HStack>
          </Card.Body>
        </Card.Root>
        <Portal>
          <Menu.Positioner>
            <MenuContent>
              <Menu.Item value="elimina" asChild>
                <Button
                  variant="plain"
                  size="sm"
                  _hover={{ bg: "bg.muted" }}
                  asChild
                >
                  <Link
                    to="/app/users/$userId"
                    params={{ userId: user.id.toString() }}
                  >
                    <RiProfileLine />
                    {t("membri.vaiAlProfilo")}
                  </Link>
                </Button>
              </Menu.Item>

              <Menu.Item value="vedi-profilo" asChild>
                <Button
                  variant="plain"
                  size="sm"
                  color="fg.error"
                  _hover={{ bg: "bg.error", color: "fg.error" }}
                >
                  <HiOutlineUserRemove />
                  {t("rimuovi")}
                </Button>
              </Menu.Item>
            </MenuContent>
          </Menu.Positioner>
        </Portal>
      </Menu.ContextTrigger>
    </Menu.Root>
  );
};

export default MemberCard;
