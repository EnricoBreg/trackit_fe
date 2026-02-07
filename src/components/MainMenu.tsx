"use client";

import NavLink from "@/components/NavLink";
import type User from "@/domain/entities/User";
import useAuthStore from "@/hooks/stores/useAuthStore";
import useAppTranslation from "@/hooks/useTranslation";
import authService from "@/services/auth-service";
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
import { useMatchRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FaProjectDiagram, FaRegQuestionCircle, FaUsers } from "react-icons/fa";
import { FaBars, FaXmark } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import { RxExit } from "react-icons/rx";
import IconContainer from "./IconContainer";

interface MainMenuLinkShape {
  to: string;
  name: string;
  icon: React.ReactNode;
}

const MainMenu = () => {
  const { t } = useAppTranslation("main_menu");

  const links: MainMenuLinkShape[] = [
    {
      to: "/app/dashboard",
      name: t("home"),
      icon: <MdDashboard />,
    },
    { to: "/app/users", name: t("utenti"), icon: <FaUsers /> },
    { to: "/app/projects", name: t("progetti"), icon: <FaProjectDiagram /> },
    { to: "/about", name: t("about"), icon: <FaRegQuestionCircle /> },
  ];

  const handleLogout = () => authService.logout();

  const [open, setOpen] = useState(false);

  const user = useAuthStore((s) => s.userDetails?.user) as User;

  let nominativo = "";
  if (user) {
    if (user.nome && user.cognome) nominativo = user.nome + " " + user.cognome;
    else nominativo = user.username;
  }

  const matchRoute = useMatchRoute();

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
                  {links.map((link, index) => {
                    const isActive = matchRoute({ to: link.to }) as boolean;

                    return (
                      <NavLink
                        to={link.to}
                        key={index}
                        callbackFn={() => setOpen(!open)}
                        active={isActive}
                      >
                        <HStack
                          gap={2}
                          alignItems={"center"}
                          justifyContent={"start"}
                        >
                          <IconContainer>{link.icon}</IconContainer>
                          {link.name}
                        </HStack>
                      </NavLink>
                    );
                  })}
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
