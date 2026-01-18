import { z } from "zod";

export const createUserSchema = z.object({
  username: z.string().nonempty("Nome utente richiesto"),
  email: z.email("Email non valida"),
  password: z.string().min(8, "Password non valida"),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;
