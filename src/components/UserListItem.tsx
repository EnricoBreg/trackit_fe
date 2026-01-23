import type User from "@/domain/entities/User";
import { GlobalPermission } from "@/domain/global-permissions";
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
import { FaRegEdit } from "react-icons/fa";
import { LuInfo } from "react-icons/lu";
import ChangeUserPasswordDialog from "./ChangeUserPasswordDialog";
import DeleteUserDialog from "./DeleteUserDialog";
import GlobalPermissionGuard from "./GlobalPermissionGuard";

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
                {/* <Menu.Item value="messaggio" justifyContent="center">
                  <Button variant="plain" size="sm">
                    <FaRegMessage />
                    {t("messaggio")}
                  </Button>
                </Menu.Item> */}

                <Menu.Item value="informazioni" justifyContent="center">
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
                      <LuInfo />
                      {t("info_long")}
                    </Link>
                  </Button>
                </Menu.Item>

                <GlobalPermissionGuard
                  permission={GlobalPermission.USER_EDIT.key}
                >
                  <Menu.Item value="modifica" justifyContent="center">
                    <Button
                      variant="plain"
                      size="sm"
                      _hover={{ bg: "bg.muted" }}
                      asChild
                    >
                      <Link
                        to="/app/users/$userId/edit"
                        params={{ userId: user.id.toString() }}
                      >
                        <FaRegEdit />
                        {t("modifica")}
                      </Link>
                    </Button>
                  </Menu.Item>
                </GlobalPermissionGuard>

                <GlobalPermissionGuard
                  permission={GlobalPermission.USER_RESET_PASSWORD.key}
                >
                  <Menu.Item value="elimina" justifyContent="center" asChild>
                    <ChangeUserPasswordDialog userId={user.id} />
                  </Menu.Item>
                </GlobalPermissionGuard>

                <GlobalPermissionGuard
                  permission={GlobalPermission.USER_DELETE.key}
                >
                  <Menu.Item value="elimina" justifyContent="center" asChild>
                    <DeleteUserDialog user={user} />
                  </Menu.Item>
                </GlobalPermissionGuard>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </Card.Footer>
    </Card.Root>
  );
};

export default UserListItem;
