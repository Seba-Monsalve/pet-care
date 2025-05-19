import { Link, Outlet, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import {
  PawPrintIcon,
  Users,
  Settings,
  LogOut,
  HousePlus,
  TriangleAlertIcon,
} from "lucide-react";
import { useAuthStore } from "@/store/auth.store";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export default function DashboardLayout() {
  const { user, logout: logoutAuth } = useAuthStore();
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  function logout() {
    return async () => {
      localStorage.removeItem("user");
      toast.success("Sesión cerrada", {
        description: "Hasta luego!!",
        icon: <PawPrintIcon className="h-5 w-5 text-rose-500" />,
      });
      await logoutAuth();
      navigate("/", { replace: true });
      queryClient.clear();
    };
  }

  return (
    <div className="flex  flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4 px-5">
          <div className="flex items-center gap-2">
            <Link to="/dashboard" className="flex items-center gap-2">
              <PawPrintIcon className="h-6 w-6 text-rose-500" />
              <span className="text-xl font-bold">PetCare</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {user && (
              <span className="text-sm hidden md:block">
                Hola, <span className="font-medium">{user.username}</span>
              </span>
            )}
            <Button variant="ghost" size="icon" onClick={logout()}>
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Cerrar sesión</span>
            </Button>
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden md:flex w-48 flex-col border-r bg-background">
          <div className="flex flex-col gap-2 p-4">
            {/* <Link to="/dashboard">
              <Button variant="ghost" className="w-full justify-start">
                <LayoutDashboard className="mr-2 h-5 w-5" />
                Dashboard
              </Button>
            </Link> */}
            <Link to="/dashboard/">
              <Button variant="ghost" className="w-full justify-start">
                <PawPrintIcon className="mr-2 h-5 w-5" />
                Mis Mascotas
              </Button>
            </Link>
            <div>
              {/* Veterinarios */}
              <Button disabled variant="ghost" className="w-full justify-start">
                <Users className="mr-2 h-5 w-5" />
                Veterinarios
              </Button>
            </div>
            {/* search */}
            <Button variant="ghost" className="w-full justify-start" onClick={() => navigate("/dashboard/lost-pets")}>
              <TriangleAlertIcon className="mr-2 h-5 w-5" />
              Mascotas Perdidas
            </Button>
            {/* adopcion */}
            <Button disabled variant="ghost" className="w-full justify-start">
              <HousePlus className="mr-2 h-5 w-5" />
              Adopta!
            </Button>
            {/* config */}
            <Link to={"/dashboard/profile"}>
              <Button variant="ghost" className="w-full justify-start">
                <Settings className="mr-2 h-5 w-5" />
                Configuración
              </Button>
            </Link>
          </div>
        </aside>
        <main className="flex-1 ">
          <div className="mx-auto px-2  p-0.1 max-w-5xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
