import type User from "@/domain/entities/User";
import useAppTranslation from "@/hooks/useTranslation";
import {
  Avatar,
  Button,
  Card,
  HStack,
  Menu,
  Portal,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link } from "@tanstack/react-router";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegMessage } from "react-icons/fa6";
import { LuInfo } from "react-icons/lu";
import DeleteUserDialog from "./DeleteUserDialog";

interface Props {
  user: User;
}

const UserListItem = ({ user }: Props) => {
  const { t } = useAppTranslation();

  let nominativo = "";
  if (user.nome && user.cognome) {
    nominativo = user.nome + " " + user.cognome;
  } else if (user.nome) {
    nominativo = `${user.nome} (${user.username})`;
  } else if (user.cognome) {
    nominativo = `${user.nome} (${user.username})`;
  } else {
    nominativo = user.username;
  }

  return (
    <Card.Root flexDirection="row" width="full">
      <Card.Body spaceX={20}>
        <HStack>
          <Avatar.Root>
            <Avatar.Image />
            <Avatar.Fallback name={nominativo} />
          </Avatar.Root>
          <Stack gap="0">
            <Text fontWeight="semibold" textStyle="sm">
              {nominativo}
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
                  <Button variant="plain" size="sm">
                    <FaRegMessage />
                    {t("messaggio")}
                  </Button>
                </Menu.Item>

                <Menu.Item value="informazioni">
                  <Button variant="plain" size="sm" asChild>
                    <Link
                      to="/app/users/$userId"
                      params={{ userId: user.id.toString() }}
                    >
                      <LuInfo />
                      {t("info_long")}
                    </Link>
                  </Button>
                </Menu.Item>

                <Menu.Item value="elimina" asChild>
                  <DeleteUserDialog user={user} />
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
