import { z } from "zod";

export const updateUserForm = z
  .object({
    username: z.string().optional(),

    password: z.string().optional(),

    password2: z.string().optional(),
    profileImg: z.any().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    isVet: z.boolean()

  })
  .refine((sch) => sch.password === sch.password2, {
    message: "Las contraseñas no coinciden.",
    path: ["password2"], // Specify the field to attach the error message
  });
