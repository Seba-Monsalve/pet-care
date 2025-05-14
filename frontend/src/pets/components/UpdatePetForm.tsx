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
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui";
import { Pet } from "../interface/pet.interface";
import { useNavigate } from "react-router";
import { usePetMutation } from "../hooks/usePetMutation";
import axios from "axios";
import { toast } from "sonner";
import { PawPrintIcon } from "lucide-react";

export function UpdatePetForm({ pet }: { pet: Pet }) {
  const form = useForm<z.infer<typeof addPetValidation>>({
    resolver: zodResolver(addPetValidation),
    defaultValues: {
      name: pet.name ?? "",
      species: pet.species ?? undefined,
      sex: pet.sex ?? undefined,
      weight: pet.weight.toString() ?? "0",
      sterilized: pet.sterilized,
      urlImage: null,
      breed: pet.breed ?? null,
      dob_month: pet.dob ? new Date(pet.dob).getMonth().toString() : "",
      dob_year: pet.dob ? new Date(pet.dob).getFullYear().toString() : "",
    },
  });

  const navigate = useNavigate();

  const { updatePetMutation } = usePetMutation();

  async function onSubmit(values: z.infer<typeof addPetValidation>) {
    const { weight, dob_month, dob_year, urlImage, ...rest } = values;
    const dob = new Date(+dob_year, +dob_month);
    let res;
    const data = new FormData();
    if (urlImage && urlImage.length > 0) {
      data.append("file", urlImage[0]);
      data.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
      );
      data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
      res = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        data,
        { withCredentials: true }
      );
    }
    updatePetMutation.mutate({
      pet: {
        weight: +weight,
        dob,
        urlImage: res?.data.secure_url || pet.urlImage,
        ...rest,
      },
      id: pet.id,
    });

    if (updatePetMutation.isError) {
      toast.error("Error al actualizar la mascota", {
        description: "No se pudo actualizar la mascota",
        icon: <PawPrintIcon className="h-5 w-5 text-rose-500" />,
      });
      return;
    }
    toast.success("Mascota actualizada", {
      description: " La mascota ha sido actualizada correctamente",
      icon: <PawPrintIcon className="h-5 w-5 text-rose-500" />,
    });
    navigate(`/dashboard/pets/${pet.id}`);
  }

  const species = form.watch("species");
  const urlImage = form.watch("urlImage");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" flex  flex-col  gap-10 items-start justify-between   "
      >
        <div className="flex flex-row gap-5 justify-center text-center items-center ">
          {/* imagen */}
          <div className="flex h-ful flex-col gap-2  text-center items-center ">
            <h2 className="font-semibold"> Imagen de tu mascota</h2>

            <img
              src={
                urlImage && urlImage.length > 0
                  ? URL.createObjectURL(urlImage[0])
                  : pet.urlImage
                  ? pet.urlImage
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
          <div className="flex h-full flex-col gap-2  text-center  space-y-2">
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
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

            <FormField
              control={form.control}
              name="breed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Raza</FormLabel>
                  <FormControl>
                    <Select
                      defaultValue={field.value}
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
          <div className="flex h-full flex-col gap-2  justify-between text-center items-center space-y-2">
            <div className="flex flex-col gap-2 space-y-2 ">
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
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={
                            pet.dob
                              ? new Date(pet.dob).getMonth().toString()
                              : ""
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="0">January</SelectItem>
                              <SelectItem value="1">February</SelectItem>
                              <SelectItem value="2">March</SelectItem>
                              <SelectItem value="3">April</SelectItem>
                              <SelectItem value="4">May</SelectItem>
                              <SelectItem value="5">June</SelectItem>
                              <SelectItem value="6">July</SelectItem>
                              <SelectItem value="7">August</SelectItem>
                              <SelectItem value="8">September</SelectItem>
                              <SelectItem value="9">October</SelectItem>
                              <SelectItem value="10">November</SelectItem>
                              <SelectItem value="11">December</SelectItem>
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
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
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
              <FormField
                control={form.control}
                name="sterilized"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Esterilizado</FormLabel>
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
            <div className="flex flex-row gap-2 space-y-2 ">
              <Button
                type="submit"
                variant={"default"}
                onClick={(e) => {
                  e.preventDefault();
                  form.handleSubmit(onSubmit)();
                }}
              >
                {updatePetMutation.isPending ? (
                  <div className="animate-spin h-5 w-5 border-4 border-t-transparent rounded-full"></div>
                ) : (
                  "Actualizar"
                )}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
