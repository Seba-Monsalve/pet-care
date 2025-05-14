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
import { useAuthStore } from "@/store/auth.store";
import { loginFormSchema } from "../validation/loginForm.schema";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { PawPrintIcon } from "lucide-react";

export function LoginForm() {
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      password: "",
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    const log = await login({ ...values });
    if (log.error) {
      toast.error(log.error, {
        icon: <PawPrintIcon className="text-rose-500" />,
      });
    } else {
      toast.success("Bienvenido de nuevo ! 🎉", {
        icon: <PawPrintIcon className="h-5 w-5 text-rose-500" />,
      });
      navigate("/dashboard  ");
    }
  }

  return (
    <div className="flex  flex-col h-2/2 items-center justify-center ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5  ">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="tu-email@dominio.cl" {...field} />
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
                  <Input placeholder="" {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" variant={"default"} className="">
            Ingresar
          </Button>
        </form>
      </Form>
    </div>
  );
}
