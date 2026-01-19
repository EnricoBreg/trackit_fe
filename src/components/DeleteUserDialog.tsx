import type User from "@/domain/entities/User";
import useAppTranslation from "@/hooks/useTranslation";
import ApiClient from "@/services/api-client";
import {
  Badge,
  Button,
  CloseButton,
  Dialog,
  Field,
  Input,
  Portal,
  Text,
  useDialog,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Trans } from "react-i18next";
import { FaRegTrashCan } from "react-icons/fa6";

interface Props {
  user: User;
}

const apiClient = new ApiClient<User>("/users");

const DeleteUserDialog = ({ user }: Props) => {
  const [text, setText] = useState("");
  const [isValid, setIsValid] = useState(false);
  const { t } = useAppTranslation();
  const dialog = useDialog({
    role: "alertdialog",
  });
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: apiClient.delete,
    onSuccess: (_) => {
      setText("");
      dialog.setOpen(false);
      router.navigate({ to: "/app/users", reloadDocument: true });
    },
    onError: (err) => {
      setText("");
    },
  });

  const handleOnChange = (text: string) => {
    const isValid = text === `trackit/@${user.username}`;
    setIsValid(isValid);
    setText(text);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(user.id);
  };

  let nominativo = "";
  if (user.nome && user.cognome) {
    nominativo = user.nome + " " + user.cognome;
  } else if (user.nome) {
    nominativo = `${user.nome} (${user.username})`;
  } else if (user.cognome) {
    nominativo = `${user.nome} (${user.username})`;
  }

  return (
    <Dialog.RootProvider
      value={dialog}
      placement="center"
      motionPreset="slide-in-bottom"
    >
      <Dialog.Trigger asChild>
        <Button
          variant="plain"
          width="full"
          size="sm"
          color="fg.error"
          _hover={{ bg: "bg.error", color: "fg.error" }}
        >
          <FaRegTrashCan />
          {t("elimina")}
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <form onSubmit={(e) => handleSubmit(e)}>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>{t("seiSicuro")}</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Text marginBottom={4}>
                  <Trans
                    i18nKey="utenti.eliminaUtenteMessaggio"
                    values={{ nominativo, username: user.username }}
                    components={{
                      badge: <Badge variant="surface" colorPalette="red" />,
                      bold: <b />,
                    }}
                  />
                </Text>
                <Field.Root invalid={!isValid}>
                  <Input
                    placeholder={`trackit/@${user.username}`}
                    value={text}
                    onChange={(e) => handleOnChange(e.currentTarget.value)}
                  />
                  <Field.ErrorText>{t("nonCorrisponde")}</Field.ErrorText>
                </Field.Root>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">{t("annulla")}</Button>
                </Dialog.ActionTrigger>
                <Button
                  colorPalette="red"
                  disabled={!isValid}
                  type="submit"
                  loading={isPending}
                >
                  {t("elimina")}
                </Button>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </form>
        </Dialog.Positioner>
      </Portal>
    </Dialog.RootProvider>
  );
};

export default DeleteUserDialog;
