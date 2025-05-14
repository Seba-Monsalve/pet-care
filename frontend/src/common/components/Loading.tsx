import { PawPrintIcon } from "lucide-react";

export const Loading = () => {
  return (
    <div className="flex h-[300px] flex-col  w-full justify-center items-center ">
      <PawPrintIcon className="h-20 w-20 text-rose-500 animate-ping transition-all duration-300" />
      <h1 className="text-2xl font-bold mt-7 ">Cargando...</h1>
    </div>
  );
};
