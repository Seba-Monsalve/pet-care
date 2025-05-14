import { Button } from "@/components/ui/button";
import { Menu, PawPrintIcon as Paw, PawPrintIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { LoginForm } from "@/auth/components/LoginForm";
import { RegisterForm } from "@/auth/components/RegisterForm";

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 border-b bg-background px-10">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Paw className="h-6 w-6 text-rose-500" />
          <span className="text-xl font-bold">PetCare</span>
        </div>
        <nav className="hidden md:flex gap-6">
          {/* <a
            href="#features"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Características
          </a> */}
          <a
            href="#how-it-works"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Cómo Funciona
          </a>
          <a
            href="#testimonials"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Testimonios
          </a>
          <a
            href="#contact"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Contacto
          </a>
        </nav>
        <div className="flex items-center gap-4">
          {/* login */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default">Login</Button>
            </DialogTrigger>
            <DialogContent className="text-center">
              <DialogHeader className="flex flex-col items-center">
                <PawPrintIcon className="h-8 w-8 text-rose-500" />

                <DialogTitle>Ingresa con tu cuenta</DialogTitle>
                <DialogDescription>
                  Gestiona tu mascota de forma fácil y rápida.
                </DialogDescription>
              </DialogHeader>
              <LoginForm />
              <DialogFooter className=""></DialogFooter>
            </DialogContent>
          </Dialog>

          {/* signup */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">SignUp</Button>
            </DialogTrigger>
            <DialogContent className="text-center">
              <DialogHeader className="flex flex-col items-center">
                <PawPrintIcon className="h-8 w-8 text-rose-500" />

                <DialogTitle> Registrate </DialogTitle>
                <DialogDescription>
                  Crea una cuenta para gestionar la salud de tu mascota.
                </DialogDescription>
              </DialogHeader>
              <RegisterForm />
              <DialogFooter className=""></DialogFooter>
            </DialogContent>
          </Dialog>

          <Button variant="ghost" size="icon" className="md:hidden ">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Menú</span>
          </Button>
        </div>
      </div>
    </header>
  );
};
