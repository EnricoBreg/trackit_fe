import type User from "@/entities/User";
import { Avatar, Button, Card, HStack, Stack, Text } from "@chakra-ui/react";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { FaRegMessage } from "react-icons/fa6";
import { LuInfo } from "react-icons/lu";

interface Props {
  user: User;
}

const UserListItem = ({ user }: Props) => {
  const { t } = useTranslation("translation");

  return (
    <Card.Root flexDirection="row" minWidth="full">
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
        <Button variant="subtle" flex="1" asChild>
          <Link to=".">
            <LuInfo />
            {t("info_short")}
          </Link>
        </Button>
        <Button variant="subtle" colorPalette="blue" flex="1">
          <FaRegMessage />
          {t("messaggio")}
        </Button>
      </Card.Footer>
    </Card.Root>
  );
};

export default UserListItem;
