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
import { addPetValidation } from "../validation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PetData } from "../data/pet.data";
import { useNavigate } from "react-router";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui";
import { usePetMutation } from "../hooks/usePetMutation";
import { toast } from "sonner";
import { PawPrintIcon } from "lucide-react";
import { uploadFile } from "@/lib/uploadFile";

export function AddPetForm() {
  const form = useForm<z.infer<typeof addPetValidation>>({
    resolver: zodResolver(addPetValidation),
    defaultValues: {
      name: "",
      species: undefined,
      sex: undefined,
      weight: "0",
      sterilized: false,
      urlImage: null,
      breed: "",
      microchip: "",
      color: "",
    },
  });

  const navigate = useNavigate();

  const { createPetMutation } = usePetMutation();

  async function onSubmit(values: z.infer<typeof addPetValidation>) {
    const { weight, dob_month, dob_year, urlImage, ...rest } = values;
    const dob = new Date(+dob_year, +dob_month);

    let res;
    if (urlImage && urlImage.length > 0) {
      res = await uploadFile(urlImage);
    }

    createPetMutation.mutate({
      weight: +weight,
      dob,
      urlImage: res?.data.secure_url,
      ...rest,
    });
    navigate("/dashboard");
    toast.success("Mascota creada correctamente", {
      description: "Un nuevo integrante en la familia!",
      icon: <PawPrintIcon className="h-5 w-5 text-rose-500" />,
    });
  }

  const species = form.watch("species");
  const urlImage = form.watch("urlImage");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" flex  flex-col  gap-10 items-start justify-between   "
      >
        <div className="flex flex-row gap-5 justify-center text-center items-center flex-wrap  ">
          {/* imagen */}
          <div className="flex  flex-col gap-2   text-center items-center ">
            <h2 className="font-semibold"> Imagen de tu mascota</h2>
            <img
              src={
                urlImage && urlImage.length > 0
                  ? URL.createObjectURL(urlImage[0])
                  : species
                    ? `/assets/images/${species.toLowerCase()}.jpg`
                    : `/assets/images/none.jpg`
              }
              alt="Imagen de la mascota"
              className="h-50 w-50 rounded-lg object-cover "
            />
            <FormField
              control={form.control}
              name="urlImage"
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
          {/* name */}
          <div className="flex flex-col gap-2  text-center  space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de la mascota</FormLabel>
                  <FormControl>
                    <Input placeholder="Fido" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* sex */}
            <FormField
              control={form.control}
              name="sex"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sexo</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className="w-[280px]">
                        <SelectValue placeholder="Selecciona sexo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {["hembra", "macho"].map((value) => (
                            <SelectItem key={value} value={value}>
                              {value.charAt(0).toUpperCase() + value.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* color */}
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Blanco"
                      {...field}
                      type="text"
                      min={1}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* species */}
            <FormField
              control={form.control}
              name="species"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Especie</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[280px]">
                        <SelectValue placeholder="Selecciona Especie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {Object?.keys(PetData)?.map((value) => (
                            <SelectItem key={value} value={value}>
                              {value.charAt(0).toUpperCase() + value.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* breed */}
            <FormField
              control={form.control}
              name="breed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Raza</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      disabled={!form.watch("species")}
                    >
                      <SelectTrigger className="w-[280px]">
                        <SelectValue placeholder="Selecciona Raza" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {PetData[species] &&
                            PetData[species].map((value) => (
                              <SelectItem key={value} value={value}>
                                {value.charAt(0).toUpperCase() + value.slice(1)}
                              </SelectItem>
                            ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* peso */}
          <div className="flex flex-col gap-2 lg:h-full  justify-between text-center space-y-2">
            <div className="flex flex-col gap-2 space-y-2   ">
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Peso</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="50 kg"
                        {...field}
                        type="number"
                        min={1}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Label>Fecha de nacimiento</Label>
              <div className="flex flex-row gap-2 w-full">
                <FormField
                  control={form.control}
                  name="dob_month"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Mes" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="0">Enero</SelectItem>
                              <SelectItem value="1">Febrero</SelectItem>
                              <SelectItem value="2">Marzo</SelectItem>
                              <SelectItem value="3">Abril</SelectItem>
                              <SelectItem value="4">Mayo</SelectItem>
                              <SelectItem value="5">Junio</SelectItem>
                              <SelectItem value="6">Julio</SelectItem>
                              <SelectItem value="7">Agosto</SelectItem>
                              <SelectItem value="8">Septiembre</SelectItem>
                              <SelectItem value="9">Octubre</SelectItem>
                              <SelectItem value="10">Noviembre</SelectItem>
                              <SelectItem value="11">Diciembre</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dob_year"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Año" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {Array.from({ length: 10 }, (_, i) => {
                                const year = new Date().getFullYear() - i;
                                return (
                                  <SelectItem
                                    key={year}
                                    value={year.toString()}
                                  >
                                    {year}
                                  </SelectItem>
                                );
                              })}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* microchip */}
              <FormField
                control={form.control}
                name="microchip"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Microchip</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* esterilizado */}
              <FormField
                control={form.control}
                name="sterilized"
                render={({ }) => (
                  <FormItem>
                    <FormLabel>Esterilizado</FormLabel>
                    <FormControl>
                      <Switch />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className=" w-full ">
              Ingresar
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
