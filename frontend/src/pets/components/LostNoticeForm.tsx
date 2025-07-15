import {
    Button,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
} from "@/components/ui";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { addLostNoticeSchema } from "../validation/addLostNotice.schema";
import { useLostPetNoticeMutation } from "../hooks/useLostPetNoticeMutation";
import { toast } from "sonner";
import { LostPetHistory } from "../interface/pet.interface";
import { SearchBox } from "@mapbox/search-js-react";
import { useState } from "react";

export const LostNoticeForm = ({ pet, setisOpen }: { pet: any, setisOpen: (value: boolean) => void }) => {
    // const { pet } = usePet();
    const { createLostPetNotice } = useLostPetNoticeMutation();
    const [locationString, setlocationString] = useState(pet.location || "");

    const petLostRecord = pet.lostPetHistory.find((record: LostPetHistory) => record.status === "Perdido");
    const ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_KEY


    const form = useForm<z.infer<typeof addLostNoticeSchema>>({
        resolver: zodResolver(addLostNoticeSchema),
        defaultValues: {
            description: petLostRecord?.description || "",
            // lastSeen: petLostRecord?.lastSeen ? format(petLostRecord.lastSeen, 'dd/mm/yyyy') : format(new Date, 'dd/mm/yyyy'),
            lastSeen: petLostRecord?.lastSeen || new Date(),
            location: petLostRecord?.location || "",
            reward: petLostRecord?.reward ?? "0",
        },
    });

    async function onSubmit(values: z.infer<typeof addLostNoticeSchema>) {
        console.log({ ...values, ...locationString });
        await createLostPetNotice.mutate({
            ...values,
            pet,
            reward: +(values?.reward ?? 0),
            lat: locationString.lat || pet.location?.lat || 0,
            lng: locationString.lng || pet.location?.lng || 0,
        });

        if (!createLostPetNotice.isError) {
            toast.success("Se ha creado la publicación de la mascota perdida");
            setisOpen(false)
            return
        }
        toast.error("Error al crear la publicación de la mascota perdida");

    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* lastSeen */}


                <div className="flex items-center justify-between">

                    <FormField
                        control={form.control}
                        name="lastSeen"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Visto por ultima vez</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[240px] pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, 'dd/MM/yyyy')
                                                ) : (
                                                    <span>Elige fecha</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={new Date(field.value) || undefined}
                                            onSelect={field.onChange}
                                            disabled={(date: any) =>
                                                date > new Date() || date < new Date("1900-01-01")
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* reward */}
                    <FormField
                        control={form.control}
                        name="reward"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Recompensa</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="$ 1200"
                                        {...field}
                                        type="number"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>


                {/* Lugar */}
                {/* <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Lugar</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Centro"
                                    {...field}
                                    type="text"
                                    min={1}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                /> */}

                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Lugar</FormLabel>
                            <SearchBox
                                accessToken={ACCESS_TOKEN}
                                onRetrieve={(e) => {
                                    const address = e.features[0].properties.full_address;
                                    setlocationString({
                                        lat: e.features[0].geometry.coordinates[1] ?? 0,
                                        lng: e.features[0].geometry.coordinates[0] ?? 0,
                                    });
                                    field.onChange(address);
                                }}
                                value={field.value}
                                placeholder="Ingresa tu dirección"
                            />
                            <FormMessage />
                        </FormItem>
                    )}
                />




                {/* descscription */}
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descripción</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Descripción de la mascota al momento de perderla"
                                    className="w-full resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />


                <Button type="submit" >Aceptar</Button>

                {JSON.stringify(form.getValues())}
                {JSON.stringify(form.getFieldState("location"))}

            </form>
        </Form >
    );
};
