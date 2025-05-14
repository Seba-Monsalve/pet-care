import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pet } from "../interface/pet.interface";
import { PawPrintIcon, Trash2 } from "lucide-react";
import { usePetMutation } from "../hooks";
import { toast } from "sonner";

// // Datos de ejemplo para el historial médico
// const medicalRecords = [
//   {
//     id: "m1",
//     date: "2023-05-15",
//     type: "Revisión general",
//     diagnosis: "Saludable, sin problemas detectados",
//     treatment: "Ninguno",
//     vet: "Dr. García",
//     status: "Completado",
//   },
//   {
//     id: "m2",
//     date: "2023-02-10",
//     type: "Problema digestivo",
//     diagnosis: "Gastroenteritis leve",
//     treatment: "Dieta especial y medicación durante 5 días",
//     vet: "Dra. Martínez",
//     status: "Completado",
//   },
//   {
//     id: "m3",
//     date: "2022-11-05",
//     type: "Revisión dental",
//     diagnosis: "Acumulación de sarro",
//     treatment: "Limpieza dental programada",
//     vet: "Dr. García",
//     status: "Pendiente",
//   },
// ]

export function MedicalHistory({ pet }: { pet: Pet }) {
  const { updatePetMutation } = usePetMutation();
  function deleteRecord(id: string): void {
    const medicalRecord = pet.medicalRecord.filter(
      (record) => record.id !== id
    );
    updatePetMutation.mutate({
      pet: {
        medicalRecord: medicalRecord,
        vaccinationHistory: pet.vaccinationHistory,
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
      description: "El historial médico ha sido actualizado ",
      icon: <PawPrintIcon className="h-5 w-5 text-rose-500" />,
    });
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Fecha</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Descripción</TableHead>
            {/* <TableHead>Tratamiento</TableHead> */}
            {/* <TableHead>Veterinario</TableHead> */}
            <TableHead>Acciones</TableHead>
            {/* <TableHead>Estado</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {pet.medicalRecord.length > 0 ? (
            pet.medicalRecord.map((record) => (
              <TableRow key={record.id}>
                <TableCell>
                  {new Date(record.date).toLocaleDateString()}
                </TableCell>
                <TableCell className="font-medium">{record.type}</TableCell>
                <TableCell>{record.description}</TableCell>
                <TableCell>
                  <Trash2
                    className="text-rose-500 h-5 w-5 rounded-lg hover:bg-rose-100 cursor-pointer"
                    onClick={() => deleteRecord(record.id)}
                  />
                </TableCell>
                {/* <TableCell>{record.vet}</TableCell> */}
                {/* <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      record.status === "Completado"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : "bg-amber-50 text-amber-700 border-amber-200"
                    }
                  >
                    {record.status}
                  </Badge>
                </TableCell> */}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center py-4 text-muted-foreground"
              >
                No hay registros médicos para esta mascota
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
