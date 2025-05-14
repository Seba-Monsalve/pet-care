import { Button } from "@/components/ui/button";
import { PawPrintIcon, ArrowLeft } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Link } from "react-router";
import { RegisterForm } from "../components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className=" flex  flex-col h-screen w-full">
      <div className="flex flex-col text-center items-center justify-center py-2">
        <Card className="w-1/3">
          <CardHeader>
            <Link to="/" className=" relative -left-2 -top-2 sm:top-0  ">
              <Button variant="ghost" className="flex items-center gap-1">
                <ArrowLeft className="h-4 w-4" />
                Volver
              </Button>
            </Link>
            <div className="flex gap-3 items-center justify-center text-center ">
              <PawPrintIcon className="h-8 w-8 text-rose-500" />
              <h1 className="text-2xl font-semibold tracking-tight">
                Registrarse
              </h1>
            </div>
          </CardHeader>
          <CardContent>
            <RegisterForm />
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground text-center">
              ¿Ya tienes una cuenta?{" "}
              <Link
                to="/login"
                className="underline underline-offset-4 hover:text-primary text-center"
              >
                Ingresar
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
