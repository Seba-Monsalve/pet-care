import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Phone,
  Mail,
  Check,
  TriangleAlertIcon,
  PawPrintIcon,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";
import { Separator } from "@radix-ui/react-separator";
import { useLostPet } from "../hooks/useLostPet";
import { useAuthStore } from "@/store/auth.store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LostNoticeForm } from "../components/LostNoticeForm";
import { calculateYear } from "@/lib/calculateYear";
import { useState } from "react";
import { useLostPetNoticeMutation } from "../hooks/useLostPetNoticeMutation";
import { toast } from "sonner";
import MapboxExample from "@/common/components/MapWithGeocoder";

export default function LostPetDetailPage() {

  const { user } = useAuthStore();
  const { id } = useParams();
  if (!id) {
    return <div>Error: ID de mascota no proporcionado.</div>;
  }
  const { lostPetQuery } = useLostPet(id)
  const { data: pet, isLoading, } = lostPetQuery

  const lostPetRecord = pet?.lostPetHistory?.find(
    (record) => record.status === "Perdido"
  );
  const { foundPetNotice } = useLostPetNoticeMutation();

  const [isOpen, setisOpen] = useState(false);
  const navigate = useNavigate();

  async function onPetFound() {
    await foundPetNotice.mutate({
      pet,
      lostPetRecordId: lostPetRecord?.id,
    });

    if (!foundPetNotice.isError) {
      toast.success("Se ha actualizado la publicación de la mascota perdida");
      setisOpen(false);
      navigate(`/dashboard/pets/${id}`);
      return;
    }
    toast.error("Error al crear la actualizar de la mascota perdida");
  }

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="flex flex-col gap-2 relative z-10 ">
      <Link to={`/dashboard/lost-pets/`} className="absolute top-4 left-4 ">
        <Button variant="outline" size="icon" className="cursor-pointer ">
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Volver</span>
        </Button>
      </Link>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardContent className="flex flex-col items-center text-center">
            <div className=" max-h-50 overflow-hidden rounded-md mb-4 ">
              <img
                src={
                  pet?.urlImage ||
                  `/assets/images/${pet?.species.toLocaleLowerCase()}.jpg`
                }
                alt={pet?.name}
                className="object-contain"
              />
            </div>
            <Badge variant={pet?.isLost ? "destructive" : "default"}>
              {pet?.isLost ? "Perdido" : "Encontrado"}
            </Badge>
            <h2 className="text-2xl font-bold">{pet?.name}</h2>
            <p className="text-sm text-muted-foreground">
              {pet?.species} - {pet?.breed}
            </p>

            <div className="mt-6 w-full space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <span className="text-sm font-medium">Género</span>
                <span className="text-sm">{pet?.sex}</span>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <span className="text-sm font-medium">Edad</span>
                {calculateYear(pet?.dob.toString() || "")}
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <span className="text-sm font-medium">Color</span>
                <span className="text-sm">{pet?.color}</span>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <span className="text-sm font-medium">Recompensa</span>
                <span className="text-sm font-semibold text-rose-500">
                  {" "}
                  {`${lostPetRecord?.reward}` || "No definido"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="md:col-span-2 bg-transparent">

          <CardContent>
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="details">Detalles</TabsTrigger>
                <TabsTrigger value="location">
                  Ubicación
                </TabsTrigger>

              </TabsList>

              <TabsContent value="details" className="space-y-2">
                <div className="space-y-4">
                  <div className="flex items-center justify-around gap-4">
                    <div className="space-y-2 bg-gray-100 p-2 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-rose-500" />
                        <h3 className="text-sm font-medium">
                          Fecha de desaparición
                        </h3>
                      </div>
                      <p className="text-sm p-2">
                        {new Date(
                          lostPetRecord?.lastSeen || ""
                        ).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="space-y-2 bg-gray-100 p-2 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-rose-500" />
                        <h3 className="text-sm font-medium">Encontrado el: </h3>
                      </div>
                      {!pet?.isLost ? (
                        <>
                          <p className="text-sm p-2">
                            {new Date(
                              lostPetRecord?.foundAt || ""
                            ).toLocaleString()}
                          </p>
                        </>
                      ) : (
                        <div className="flex items-center gap-2 bg-red-300 rounded-md p-2">
                          <TriangleAlertIcon />
                          <p className="text-sm">Perdido</p>
                        </div>
                      )}
                    </div>


                    <div className="space-y-2 bg-gray-100 p-2 rounded-lg">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-rose-500" />
                        <h3 className="text-sm font-medium ">
                          Última ubicación conocida
                        </h3>
                      </div>
                      <p className="text-sm p-2">
                        {lostPetRecord?.location || "No location"}
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Descripción</h3>
                    <p className="text-sm">
                      {lostPetRecord?.description || "Sin descripcion"}
                    </p>
                  </div>
                  <hr />
                  <h3 className="text-lg font-medium mb-2 w-fit">
                    Información del Propietario
                  </h3>
                  <div className="flex flex-row items-center justify-between mt-4 gap-5">
                    <div className=" w-2/3 rounded-lg border p-4 gap-4 flex flex-row items-center">
                      <Avatar className="h-15 w-15">
                        <AvatarImage
                          src={pet?.owner.urlImage}
                          className="object-cover"
                        />
                        <AvatarFallback>
                          {pet?.owner.username?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="space-y-2">
                        <p className="font-medium">{pet?.owner.username}</p>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4 text-rose-500" />
                          <span>{pet?.owner.phone || "No definido"}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-4 w-4 text-rose-500" />
                          <span>{pet?.owner.email}</span>
                        </div>
                      </div>
                    </div>

                    {pet?.owner.id == user?.id && (
                      <div className="flex flex-col items-center justify-between mt-4 gap-2 w-1/3">
                        <Dialog open={isOpen} onOpenChange={setisOpen}>
                          <DialogTrigger asChild>
                            <Button variant="outline" className="w-full">
                              Editar Información
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="text-center">
                            <DialogHeader className="flex flex-col items-center">
                              <PawPrintIcon className="h-8 w-8 text-rose-500" />

                              <DialogTitle>
                                {" "}
                                Aviso de perdida de mascota{" "}
                              </DialogTitle>
                              <DialogDescription className="text-sm text-muted-foreground text-center">
                                Entrega todos los detalles de tu mascota perdida
                                para ayudar a otros a identificarla y
                                contactarte.
                              </DialogDescription>
                            </DialogHeader>
                            <LostNoticeForm pet={pet} setisOpen={setisOpen} />
                            <DialogFooter className=" flex flex-col items-center justify-center"></DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <Link
                          to={`/dashboard/pets/update/${pet?.id}`}
                          className="w-full"
                        ></Link>
                        <Button
                          className="bg-green-600 hover:bg-green-700 w-full"
                          onClick={onPetFound}
                        >
                          <Check className="mr-2 h-4 w-4" />
                          Marcar como Encontrada
                        </Button>
                      </div>
                    )}
                  </div>
                  <hr />

                </div>
              </TabsContent>
              <TabsContent value="location">
                <div className="mt-4 space-y-4">

                  <MapboxExample lat={lostPetRecord?.lat!} lng={lostPetRecord?.lng!} />

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Dirección</h3>
                    <p className="text-sm">
                      {lostPetRecord?.location || "No location"}
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="updates" className="space-y-4">
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-medium">
                      Actualizaciones y Avistamientos
                    </h3>
                    <Button className="bg-rose-500 hover:bg-rose-600" size="sm">
                      Añadir Actualización
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>

        </Card>
      </div>
    </div>
  );
}
