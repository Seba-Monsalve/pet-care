import { Link } from "react-router";
import { AddPetForm } from "../components/AddPetForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const AddPetPage = () => {
  return (
    <div className=" relative flex flex-col gap-4 p-4 w-full items-center justify-center">
      <Link to="/dashboard" className="absolute top-4 left-4 ">
        <Button variant="outline" size="icon" className="cursor-pointer">
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Volver</span>
        </Button>
      </Link>
      <h1 className="text-2xl font-bold">Agregar Mascota</h1>
      <p className="text-sm text-muted-foreground">
        Completa el formulario para agregar una nueva mascota.
      </p>

      <div className=" flex flex-row  mt-4 w-full">
        <AddPetForm />
      </div>
    </div>
  );
};
