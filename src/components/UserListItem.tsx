import type User from "@/entities/User";
import useAppTranslation from "@/hooks/useTranslation";
import {
  Avatar,
  Box,
  Button,
  Card,
  Link as ChakraLink,
  HStack,
  Menu,
  Portal,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link } from "@tanstack/react-router";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegMessage, FaRegTrashCan } from "react-icons/fa6";
import { LuInfo } from "react-icons/lu";

interface Props {
  user: User;
}

const UserListItem = ({ user }: Props) => {
  const { t } = useAppTranslation();

  return (
    <Card.Root flexDirection="row" width={{ base: "sm", md: "lg", xl: "2xl" }}>
      <Card.Body spaceX={20}>
        <HStack>
          <Avatar.Root>
            <Avatar.Image />
            <Avatar.Fallback name={user.nome + " " + user.cognome} />
          </Avatar.Root>
          <Stack gap="0">
            <Text fontWeight="semibold" textStyle="sm">
              {user.nome + " " + user.cognome}
            </Text>
            <Text color="fg.muted" textStyle="sm">
              @{user.username}
            </Text>
          </Stack>
        </HStack>
      </Card.Body>
      <Card.Footer paddingBottom={0}>
        <Menu.Root>
          <Menu.Trigger asChild>
            <Button variant="outline">
              <BsThreeDotsVertical />
            </Button>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Item value="messaggio">
                  <FaRegMessage />
                  <Box flex="1">{t("messaggio")}</Box>
                </Menu.Item>

                <Menu.Item value="informazioni" focusVisibleRing="none">
                  <Box flex="1">
                    <ChakraLink asChild>
                      <Link
                        to="/app/users/$userId"
                        params={{ userId: user.id.toString() }}
                      >
                        <LuInfo />
                        {t("info_long")}
                      </Link>
                    </ChakraLink>
                  </Box>
                </Menu.Item>

                <Menu.Item
                  value="elimina"
                  color="fg.error"
                  _hover={{ bg: "bg.error", color: "fg.error" }}
                >
                  <FaRegTrashCan />
                  <Box flex="1">{t("elimina")}</Box>
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </Card.Footer>
    </Card.Root>
  );
};

export default UserListItem;
