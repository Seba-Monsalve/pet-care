import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { Textarea } from "@/components/ui/textarea";
import { VaccinationRecordType } from "../interface/pet.interface";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addVaccinationRecord } from "../validation/addVaccinationRecord.schema";
import { usePetMutation } from "../hooks";
import { PopoverClose } from "@radix-ui/react-popover";
import { months_ES } from "@/common/data/date.data";

export const AddVaccinationRecordForm = ({ pet }: { pet: any }) => {
  const { updatePetMutation } = usePetMutation();

  const form = useForm<z.infer<typeof addVaccinationRecord>>({
    resolver: zodResolver(addVaccinationRecord),
    defaultValues: {
      type: VaccinationRecordType.Rabia,
      description: "",
      month: new Date().getMonth().toString(),
      year: (new Date().getFullYear() + 1).toString(),
    },
  });

  function onSubmit(values: z.infer<typeof addVaccinationRecord>) {
    const vaccinationHistory = [
      ...pet.vaccinationHistory,
      {
        id: undefined,
        nextDate: new Date(+values.year, +values.month),
        createdAt: undefined,
        type: values.type,
        status: false,
        // description: values.description,
      },
    ];

    updatePetMutation.mutate({
      pet: {
        vaccinationHistory,
        medicalRecord: pet.medicalRecord,
      },
      id: pet.id,
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <div>
          <h3 className="text-lg font-medium mb-2">Nueva Vacuna </h3>
          <p className="text-sm text-muted-foreground"></p>
        </div>

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo</FormLabel>
              <FormControl>
                <Select {...field} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {Object.values(VaccinationRecordType).map((value) => (
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea
                  rows={4}
                  placeholder="Descripción del registro médico"
                  className="w-full resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Label>Próxima Vacunación</Label>
        <div className="flex flex-row gap-2 w-full">
          <FormField
            control={form.control}
            name="month"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    {...field}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {months_ES.map((month, index) => (
                          <SelectItem key={index} value={index.toString()}>
                            {month}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    {...field}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {Array.from({ length: 4 }, (_, i) => {
                          const year = new Date().getFullYear() + i;
                          return (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          );
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <PopoverClose
          disabled={!form.formState.isValid}
          type="submit"
          className={`cursor-pointer  ${
            !form.formState.isValid
              ? "bg-gray-300 text-gray-500"
              : "bg-rose-500 text-white hover:bg-rose-600"
          }  rounded-md px-4 py-2 text-sm font-medium  
          }`}
        >
          Ingresar
        </PopoverClose>
      </form>
    </Form>
  );
};
