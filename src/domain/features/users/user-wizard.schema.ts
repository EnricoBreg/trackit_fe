import { t } from "i18next";
import { z } from "zod";

export const createUserSchema = z
  .object({
    nome: z.string().optional(),
    cognome: z.string().optional(),
    username: z.string().nonempty(t("utenti.usernameNecessario")),
    email: z.email(t("utenti.emailNonValida")),
    password: z.string().min(8, {
      error: (iss) => {
        return t("utenti.passwordNonValida", { min: iss.minimum.toString() });
      },
    }),
    confirmPassword: z.string(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: t("utenti.passwordDiverse"),
        path: ["confirmPassword"],
      });
    }
  });

export type CreateUserSchema = z.infer<typeof createUserSchema>;
