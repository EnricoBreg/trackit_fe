"use client";

import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  CloseButton,
  Drawer,
  Flex,
  HStack,
  Portal,
  Show,
  Text,
  VStack,
} from "@chakra-ui/react";
import NavLink from "@/components/NavLink";
import { useState } from "react";
import { FaBars, FaXmark } from "react-icons/fa6";
import { RxExit } from "react-icons/rx";
import { useTranslation } from "react-i18next";
import useAuthStore from "@/hooks/stores/useAuthStore";
import type User from "@/entities/User";
import { useRouter } from "@tanstack/react-router";

interface MainMenuLinkShape {
  to: string;
  name: string;
}

const MainMenu = () => {
  const { t } = useTranslation("translation", { keyPrefix: "main_menu" });

  const links: MainMenuLinkShape[] = [
    { to: "/dashboard", name: t("home") },
    { to: "/users", name: t("utenti") },
    { to: "/about", name: t("about") },
  ];

  const router = useRouter();
  const handleLogout = () => {
    useAuthStore.getState().clearAuth();
    setOpen(false);
    router.navigate({ to: "/login" });
  };

  const [open, setOpen] = useState(false);

  const user = useAuthStore((s) => s.user) as User | null;

  let nominativo = "";
  if (user) {
    if (user.nome && user.cognome) nominativo = user.nome + " " + user.cognome;
    else nominativo = user.username;
  }

  return (
    <Drawer.Root
      open={open}
      placement="start"
      onOpenChange={(e) => setOpen(e.open)}
    >
      <Drawer.Trigger asChild>
        <Button variant="ghost" size="sm">
          <Show when={!open} fallback={<FaXmark />}>
            <FaBars />
          </Show>
        </Button>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner padding="2">
          <Drawer.Content rounded="md">
            <Drawer.Header>
              <Drawer.Title>{t("titolo")}</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body paddingY="4">
              <Flex
                direction="column"
                justifyContent="space-between"
                height="full"
              >
                <VStack alignItems="start" fontSize="md" gap={4}>
                  {links.map((link, index) => (
                    <NavLink
                      to={link.to}
                      key={index}
                      callbackFn={() => setOpen(!open)}
                    >
                      {link.name}
                    </NavLink>
                  ))}
                </VStack>

                <HStack justifyContent="space-between" alignItems="center">
                  <Show
                    when={user !== null}
                    fallback={
                      <Text fontSize="md">
                        <NavLink to="/login">{t("effettuaIlLogin")}</NavLink>
                      </Text>
                    }
                  >
                    <Flex alignItems="center" gap={2}>
                      <AvatarGroup>
                        <Avatar.Root>
                          <Avatar.Fallback name={nominativo} />
                          <Avatar.Image />
                        </Avatar.Root>
                      </AvatarGroup>

                      <Box>
                        <Text fontSize="md">{nominativo}</Text>
                        <Text fontSize="sm" color="fg.muted">
                          @{user?.username}
                        </Text>
                      </Box>
                    </Flex>
                    <Box>
                      <Button
                        variant="ghost"
                        fontSize="sm"
                        onClick={() => handleLogout()}
                      >
                        <RxExit />
                      </Button>
                    </Box>
                  </Show>
                </HStack>
              </Flex>
            </Drawer.Body>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

export default MainMenu;
