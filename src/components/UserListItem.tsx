import type User from "@/entities/User";
import {
  Avatar,
  Box,
  Button,
  Card,
  HStack,
  Menu,
  Portal,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegMessage, FaRegTrashCan } from "react-icons/fa6";
import { LuInfo } from "react-icons/lu";

interface Props {
  user: User;
}

const UserListItem = ({ user }: Props) => {
  const { t } = useTranslation("translation");

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
        {/* <Button variant="subtle" flex="1" asChild>
          <Link to=".">
            <LuInfo />
            {t("info_short")}
          </Link>
        </Button>
        <Button variant="subtle" colorPalette="blue" flex="1">
          <FaRegMessage />
          {t("messaggio")}
        </Button> */}
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

                <Menu.Item value="informazioni">
                  <LuInfo />
                  <Box flex="1">{t("info_long")}</Box>
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
