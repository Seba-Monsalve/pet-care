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
import { updateUserForm } from "@/auth/validation/";
import { useAuthStore } from "@/store/auth.store";
import { toast } from "sonner";
import { PawPrintIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { uploadFile } from "@/lib/uploadFile";
import { Label } from "@/components/ui";

export function UpdateUserForm() {

  const user = useAuthStore((state) => state.user);
  const { updateUser, error } = useAuthStore();


  const form = useForm<z.infer<typeof updateUserForm>>({
    resolver: zodResolver(updateUserForm),
    defaultValues: {
      username: user?.username,
      password: undefined,
      password2: undefined,
      profileImg: undefined,
      phone: user?.phone || undefined,
      address: user?.address || undefined,
      isVet: user?.isVet || false,
    },
  });

  async function onSubmit(values: z.infer<typeof updateUserForm>) {
    let res;
    if (profileImg && profileImg.length > 0) {
      res = await uploadFile(profileImg);
    }

    updateUser({
      username: values.username,
      password: values.password,
      address: values.address,
      isVet: values.isVet,
      phone: values.phone,
      urlImage: res?.data.secure_url || user?.urlImage,
    });
    if (error) {
      toast.error("Error al actualizar el usuario", {
        icon: <PawPrintIcon className="h-5 w-5 text-rose-500" />,
      });
    } else {
      toast.success("Usuario actualizado con exito", {
        icon: <PawPrintIcon className="h-5 w-5 text-rose-500" />,
      });

      localStorage.setItem("user", JSON.stringify(user));
      // navigate("/dashboard");
    }
  }

  const profileImg = form.watch("profileImg");

  return (
    <Form {...form}>

      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-center items-center gap-5 w-fit">
        <h1 className="text-3xl font-semibold mb-2">Actualizar usuario</h1>
        <div className="flex flex-row w-fit gap-10">
          <div className="flex flex-col justify-center items-center gap-5">


            <img
              src={
                profileImg && profileImg.length > 0
                  ? URL.createObjectURL(profileImg[0])
                  : user?.urlImage
                    ? user?.urlImage
                    : `/assets/images/no-profile.jpg`
              }
              alt="Imagen de la mascota"
              className="h-50 w-50 rounded-lg object-cover "
            />
            <FormField
              control={form.control}
              name="profileImg"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        field.onChange(e.target.files);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>

          <div className="flex flex-col gap-3">

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
            <div>

              <Label className="mb-2">
                Email
              </Label>
              <Input
                disabled value={user?.email}
              />
            </div>


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
          </div>
          <div className="flex flex-col gap-3">

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefono</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="+56 9 1234 5678"
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
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dirección</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Juan Perez #143"
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
              name="isVet"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Eres veterinario</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>

        </div>

        <Button type="button" className="flex flex-row w-fit " onClick={
          (e) => {
            e.preventDefault();
            form.handleSubmit(onSubmit)();
          }
        }>
          <PawPrintIcon className="h-5 w-5 text-white font-bold" />
          Actualizar
        </Button>
      </form>
    </Form >

  );
}
