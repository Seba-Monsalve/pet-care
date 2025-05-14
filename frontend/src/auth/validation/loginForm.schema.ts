import { z } from "zod";

export const loginFormSchema = z.object({
  password: z.string().min(6, {
    message: "Contraseña debe tener al menos 6 caracteres.",
  }),
  email: z.string().email({
    message: "Email no es válido.",
  }),
});
