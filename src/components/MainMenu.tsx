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

interface MainMenuLinkShape {
  to: string;
  name: string;
}

const MainMenu = () => {
  const { t } = useTranslation("translation", { keyPrefix: "main_menu" });

  const links: MainMenuLinkShape[] = [
    { to: "/", name: t("home") },
    { to: "/users", name: t("utenti") },
    { to: "/about", name: t("about") },
  ];

  const [open, setOpen] = useState(false);

  const name = "Mario rossi";
  const username = "mario.rossi";

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
                  <Flex alignItems="center" gap={2}>
                    <AvatarGroup>
                      <Avatar.Root>
                        <Avatar.Fallback name={name} />
                        <Avatar.Image src="https://i.pravatar.cc/100" />
                      </Avatar.Root>
                    </AvatarGroup>

                    <Box>
                      <Text fontSize="md">{name}</Text>
                      <Text fontSize="sm" color="fg.muted">
                        @{username}
                      </Text>
                    </Box>
                  </Flex>
                  <Box>
                    <RxExit />
                  </Box>
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
