import { UpdatePetForm } from "../components/UpdatePetForm";
import { Link, useParams } from "react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Loading } from "@/common/components/Loading";
import { usePet } from "../hooks";

export const UpdatePetPage = () => {
  const { petId } = useParams();

  const { petQuery } = usePet(petId!);

  const { data: pet, isLoading, error } = petQuery;

  if (isLoading && !pet) return <Loading />;
  if (error || !pet) {
    return (
      <div className="flex flex-col items-center justify-center h-full mt-5">
        <h2 className="text-xl font-semibold mb-4">Mascota no encontrada</h2>
        <p className="text-gray-600 mb-4">
          No pudimos encontrar la información de la mascota solicitada.
        </p>
        <Link to="/dashboard/">
          <Button variant="outline" className=" text-white cursorpointer">
            Volver al listado de mascotas
          </Button>
        </Link>
      </div>
    );
  }
  return (
    <div className=" relative flex flex-col gap-4 p-4 w-full items-center justify-center">
      <Link
        to={`/dashboard/pets/${pet?.id}`}
        className="absolute top-4 left-4 "
      >
        <Button variant="outline" size="icon" className="cursor-pointer">
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Volver</span>
        </Button>
      </Link>
      <div className=" flex flex-row  mt-4 w-full">
        <UpdatePetForm pet={pet} />
      </div>
    </div>
  );
};
