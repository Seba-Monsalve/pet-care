import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Pet } from "../interface/pet.interface";
import { compareAsc } from "date-fns";
import { Check, Circle, PawPrintIcon, Trash2 } from "lucide-react";
import { usePetMutation } from "../hooks";
import { toast } from "sonner";

// // Datos de ejemplo para el historial de vacunación
// const vaccinations = [
//   {
//     id: "v1",
//     name: "Rabia",
//     date: "2023-01-15",
//     nextDate: "2024-01-15",
//     vet: "Dr. García",
//     status: "Completada",
//   },
//   {
//     id: "v2",
//     name: "Parvovirus",
//     date: "2022-11-20",
//     nextDate: "2023-11-20",
//     vet: "Dra. Martínez",
//     status: "Completada",
//   },
//   {
//     id: "v3",
//     name: "Moquillo",
//     date: "2022-08-05",
//     nextDate: "2023-08-05",
//     vet: "Dr. García",
//     status: "Completada",
//   },
//   {
//     id: "v4",
//     name: "Leptospirosis",
//     date: "2023-03-10",
//     nextDate: "2024-03-10",
//     vet: "Dra. Rodríguez",
//     status: "Completada",
//   },
// ]

export function VaccinationHistory({ pet }: { pet: Pet }) {
  const { updatePetMutation } = usePetMutation();
  function toogleRecord(id: string): void {
    const vaccinationHistory = pet.vaccinationHistory.map((record) => {
      if (record.id === id) {
        return {
          ...record,
          status: !record.status,
        };
      }
      return record;
    });
    updatePetMutation.mutate({
      pet: {
        vaccinationHistory: vaccinationHistory,
        medicalRecord: pet.medicalRecord,
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
      description: "El historial de vacunación ha sido actualizado ",
      icon: <PawPrintIcon className="h-5 w-5 text-rose-500" />,
    });
  }

  function deleteRecord(id: string): void {
    const vaccinationHistory = pet.vaccinationHistory.filter(
      (record) => record.id !== id
    );
    updatePetMutation.mutate({
      pet: {
        vaccinationHistory: vaccinationHistory,
        medicalRecord: pet.medicalRecord,
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
      description: "El historial de vacunación ha sido actualizado ",
      icon: <PawPrintIcon className="h-5 w-5 text-rose-500" />,
    });
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Vacuna</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Próxima Dosis</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pet.vaccinationHistory.length > 0 ? (
            pet.vaccinationHistory
              .sort(
                (a, b) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime()
              )
              .map((vaccination) => (
                <TableRow key={vaccination.id}>
                  <TableCell className="font-medium">
                    {vaccination.type}
                  </TableCell>
                  <TableCell>
                    {new Date(vaccination.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(vaccination.nextDate).toLocaleDateString()}
                  </TableCell>
                  {/* <TableCell>{vaccination.vet}</TableCell> */}
                  <TableCell className="">
                    {vaccination.status ? (
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-300"
                      >
                        Completada
                      </Badge>
                    ) : compareAsc(
                        new Date(),
                        new Date(vaccination.nextDate)
                      ) == -1 ? (
                      <Badge
                        variant="outline"
                        className="bg-yellow-50 text-yellow-700 border-yellow-400"
                      >
                        Pendiente
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="bg-red-50 text-red-700 border-red-400"
                      >
                        Atrasada
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="flex gap-2">
                    {vaccination.status ? (
                      <Check
                        className="text-white bg-green-400 p-0.5 h-5 w-5 rounded-lg cursor-pointer transition-all"
                        onClick={() => toogleRecord(vaccination.id)}
                      />
                    ) : (
                      <Circle
                        className="text-rose-500 h-5 w-5 rounded-lg hover:bg-rose-100 cursor-pointer transition-all"
                        onClick={() => toogleRecord(vaccination.id)}
                      />
                    )}
                    <Trash2
                      className="text-rose-500 h-5 w-5 rounded-lg hover:bg-rose-100 cursor-pointer transition-all"
                      onClick={() => deleteRecord(vaccination.id)}
                    />
                  </TableCell>
                </TableRow>
              ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center py-4 text-muted-foreground"
              >
                No hay registros de vacunación para esta mascota
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
