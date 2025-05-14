import { Button } from "@/components/ui/button";
import { PawPrintIcon, ArrowLeft } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Link } from "react-router";
import { LoginForm } from "../components/LoginForm";

export default function LoginPage() {
  return (
    <div className=" flex  flex-col h-screen w-full">
      <div className="flex flex-col space-y-2 text-center items-center justify-center py-5">
        <Card className="w-3/12">
          <CardHeader>
            <Link to="/" className=" relative -left-2 -top-2 sm:top-0  ">
              <Button
                variant="ghost"
                className="flex items-center gap-1 cursor"
              >
                <ArrowLeft className="h-4 w-4" />
                Volver
              </Button>
            </Link>
            <div className="flex gap-3 items-center justify-center text-center ">
              <PawPrintIcon className="h-8 w-8 text-rose-500" />
              <h1 className="text-2xl font-semibold tracking-tight">
                Ingresar
              </h1>
            </div>
          </CardHeader>
          <CardContent>
            {/* <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <Button
                type="submit"
                className="w-full  hover:bg-rose-600"
                disabled={loading}
              >
                {loading ? "Procesando..." : "Iniciar sesión"}
              </Button>
            </form> */}

            <LoginForm />
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </div>
    </div>
  );
}
