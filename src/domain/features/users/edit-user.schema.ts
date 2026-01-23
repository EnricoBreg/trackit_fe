import { t } from "i18next";
import z from "zod";

export const editUserSchema = z.object({
  nome: z.string().optional(),
  cognome: z.string().optional(),
  username: z.string().nonempty(t("utenti.usernameNecessario")),
  email: z.email(t("utenti.emailNonValida")),
});

export type EditUserSchema = z.infer<typeof editUserSchema>;
