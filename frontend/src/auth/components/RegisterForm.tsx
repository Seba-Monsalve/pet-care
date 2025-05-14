import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registerFormSchema } from "@/auth/validation/";
import { useAuthStore } from "@/store/auth.store";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { PawPrintIcon } from "lucide-react";

export function RegisterForm() {
  const { signUp, error, user } = useAuthStore();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      password2: "",
    },
  });

  async function onSubmit(values: z.infer<typeof registerFormSchema>) {
    await signUp({ ...values });
    if (error) {
      toast.error("Error al crear el usuario", {
        icon: <PawPrintIcon className="h-5 w-5 text-rose-500" />,
      });
    } else {
      toast.success("Usuario creado con exito", {
        icon: <PawPrintIcon className="h-5 w-5 text-rose-500" />,
      });

      localStorage.setItem("user", JSON.stringify(user));
      navigate("/dashboard");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="Juan Perez"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="tu-email@dominio.cl"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  {...field}
                  type="password"
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar Contraseña</FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  {...field}
                  type="password"
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="">
          Registrarse
        </Button>
      </form>
    </Form>
  );
}
