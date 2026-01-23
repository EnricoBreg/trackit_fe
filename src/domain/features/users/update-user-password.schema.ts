import { t } from "i18next";
import z from "zod";

export const updateUserPasswordSchema = z
  .object({
    password: z.string().min(8, t("utenti.passwordNonValida", { min: 8 })),
    confirmPassword: z
      .string()
      .min(8, t("utenti.passwordNonValida", { min: 8 })),
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

export type UpdateUserPasswordSchema = z.infer<typeof updateUserPasswordSchema>;
