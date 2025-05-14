import { PawPrintIcon as Paw } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="w-full border-t bg-background px-10">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex items-center gap-2">
          <Paw className="h-6 w-6 text-rose-500" />
          <span className="text-lg font-bold">PetCare</span>
        </div>
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          © {new Date().getFullYear()} PetCare. Todos los derechos reservados.
        </p>
        <div className="flex gap-4">
          {/* <Link
            to="#"
            className="text-sm text-muted-foreground underline underline-offset-4"
          >
            Términos
          </Link>
          <Link
            to="#"
            className="text-sm text-muted-foreground underline underline-offset-4"
          >
            Privacidad
          </Link>
          <Link
            to="#"
            className="text-sm text-muted-foreground underline underline-offset-4"
          >
            Cookies
          </Link> */}
        </div>
      </div>
    </footer>
  );
};
