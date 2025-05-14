import { z } from "zod";

export const registerFormSchema = z
  .object({
    username: z.string().min(2, {
      message: "Usuario debe tener al menos 2 caracteres.",
    }),
    email: z.string().email({
      message: "Email no es válido.",
    }),
    password: z.string().min(4, {
      message: "Contraseña debe tener al menos 6 caracteres.",
    }),
    password2: z.string(),
  })
  .refine((sch) => sch.password === sch.password2, {
    message: "Las contraseñas no coinciden.",
    path: ["password2"], // Specify the field to attach the error message
  });
