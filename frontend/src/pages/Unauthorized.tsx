import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export const Unauthorized = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-row h-full items-center justify-center from-gray-100 to-gray-300">
      <img
        src="/assets/images/unauthorized.png"
        alt="Unauthorized Access"
        className="rounded-2xl object-cover shadow-lg w-3/4 max-w-md"
      />
      <div className=" mt-8 flex flex-col items-center gap-4  bg-opacity-70 p-4">
        <h1 className="text-2xl font-bold text-gray-700">
          ¡Cuidado con el Perro !
        </h1>
        <p className="text-gray-600 text-center">
          Lo sentimos, no tienes permiso para acceder a esta página.
        </p>
        <Button
          onClick={() => navigate("/")}
          variant={"default"}
          className=" hover:bg-rose-600 text-white px-6 py-2 rounded-md"
        >
          Regresar sano y salvo
        </Button>
      </div>
    </div>
  );
};
