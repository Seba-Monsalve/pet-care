import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, MapPin, Calendar, Phone, Mail, Share2, Printer, Check, TriangleAlertIcon } from "lucide-react"
import { Link } from "react-router"
import { Separator } from "@radix-ui/react-separator"

// Datos de ejemplo para una mascota perdida específica
const pet = {
    id: "lost1",
    name: "Rocky",
    type: "Perro",
    breed: "Labrador",
    gender: "Macho",
    age: 3,
    color: "Negro",
    lastSeen: "2023-05-18",
    location: "Parque Central, Madrid",
    description:
        "Collar azul con placa de identificación. Es amigable y responde a su nombre. Se perdió durante un paseo en el parque cuando se asustó por unos fuegos artificiales. Puede estar escondido en algún lugar cercano al parque.",
    contactName: "Carlos Rodríguez",
    contactPhone: "+34 600 123 456",
    contactEmail: "carlos@example.com",
    reward: "200€",
    status: "Perdido",
    imageUrl: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740",
    date: "2023-05-18",
    updates: [
        {
            date: "2023-05-18",
            content: "Mascota reportada como perdida",
            author: "Carlos Rodríguez",
        },
        {
            date: "2023-05-19",
            content: "Visto cerca del Parque Central, zona norte",
            author: "Ana Martínez",
        },
        {
            date: "2023-05-20",
            content: "Posible avistamiento en Calle Mayor, a 500m del parque",
            author: "Juan López",
        },
    ],
}

export default function LostPetDetailPage() {

    return (
        <div className="flex flex-col gap-2 relative ">
            <Link
                to={`/dashboard/lost-pets/`}
                className="absolute top-4 left-4 "

            >
                <Button variant="outline" size="icon" className="cursor-pointer ">
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">Volver</span>
                </Button>
            </Link>



            <div className="grid gap-4 md:grid-cols-3">
                <Card className="md:col-span-1">
                    <CardContent className="flex flex-col items-center text-center">
                        <div className="relative h-40 w-40 overflow-hidden rounded-md mb-4">
                            <img src={pet.imageUrl || "/placeholder.svg"} alt={pet.name} className="object-cover" />
                        </div>
                        <Badge variant={pet.status === "Perdido" ? "destructive" : "default"}>{pet.status}</Badge>
                        <h2 className="text-2xl font-bold">{pet.name}</h2>
                        <p className="text-sm text-muted-foreground">
                            {pet.type} - {pet.breed}
                        </p>

                        <div className="mt-6 w-full space-y-4">
                            <div className="flex items-center justify-between border-b pb-2">
                                <span className="text-sm font-medium">Género</span>
                                <span className="text-sm">{pet.gender}</span>
                            </div>
                            <div className="flex items-center justify-between border-b pb-2">
                                <span className="text-sm font-medium">Edad</span>
                                <span className="text-sm">{pet.age} años</span>
                            </div>
                            <div className="flex items-center justify-between border-b pb-2">
                                <span className="text-sm font-medium">Color</span>
                                <span className="text-sm">{pet.color}</span>
                            </div>
                            <div className="flex items-center justify-between border-b pb-2">
                                <span className="text-sm font-medium">Recompensa</span>
                                <span className="text-sm font-semibold text-rose-500">{pet.reward}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="md:col-span-2">

                    <CardContent>
                        <Tabs defaultValue="details" className="w-full">
                            <TabsList className="grid w-full grid-cols-3 mb-4" >
                                <TabsTrigger value="details">Detalles</TabsTrigger>
                                <TabsTrigger value="location">Ubicación</TabsTrigger>
                                <TabsTrigger value="updates">Actualizaciones</TabsTrigger>
                            </TabsList>

                            <TabsContent value="details" className="space-y-2">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-around gap-4">

                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4 text-rose-500" />
                                                <h3 className="text-sm font-medium">Fecha de desaparición</h3>
                                            </div>
                                            <p className="text-sm p-2" >{new Date(pet.lastSeen).toLocaleDateString()}</p>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4 text-rose-500" />
                                                <h3 className="text-sm font-medium">Encontrado el: </h3>
                                            </div>
                                            {
                                                pet.status === "Encontrado" ? (
                                                    <p className="text-sm">{new Date(pet.lastSeen).toLocaleDateString()}</p>
                                                ) : (
                                                    <div className="flex items-center gap-2 bg-red-300 rounded-md p-2">

                                                        <TriangleAlertIcon />
                                                        <p className="text-sm">Aun perdido</p>
                                                    </div>
                                                )
                                            }
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-4 w-4 text-rose-500" />
                                                <h3 className="text-sm font-medium ">Última ubicación conocida</h3>
                                            </div>
                                            <p className="text-sm p-2">{pet.location}</p>
                                        </div>
                                    </div>


                                    <Separator />

                                    <div className="space-y-2">
                                        <h3 className="text-sm font-medium">Descripción</h3>
                                        <p className="text-sm">{pet.description}</p>
                                    </div>

                                    <Separator />

                                    <div className="flex flex-row items-center justify-between mt-4 gap-5">
                                        <div className=" w-2/3 rounded-lg border p-4">
                                            <div className="space-y-2">
                                                <p className="font-medium">{pet.contactName}</p>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <Phone className="h-4 w-4 text-rose-500" />
                                                    <span>{pet.contactPhone}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <Mail className="h-4 w-4 text-rose-500" />
                                                    <span>{pet.contactEmail}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-center justify-between mt-4 gap-5 w-1/3">
                                            <Link to={`/dashboard/lost-pets/${pet.id}/edit`} className="w-full">
                                                <Button variant="outline">Editar Información</Button>
                                            </Link>
                                            <Button className="bg-green-600 hover:bg-green-700 w-full">
                                                <Check className="mr-2 h-4 w-4" />
                                                Marcar como Encontrada
                                            </Button>
                                        </div>

                                    </div>
                                    <hr />
                                    <Separator />
                                    <div className="flex flex-row items-center justify-between mt-4 gap-5">
                                        <Button variant="outline" className="flex items-center gap-1">
                                            <Share2 className="h-4 w-4" />
                                            Compartir
                                        </Button>
                                        <Button variant="outline" className="flex items-center gap-1">
                                            <Printer className="h-4 w-4" />
                                            Imprimir
                                        </Button>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="location">
                                <div className="mt-4 space-y-4">
                                    <div className="relative h-[250px] w-full bg-muted rounded-lg">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-center">
                                                <MapPin className="mx-auto h-12 w-12 text-muted-foreground" />
                                                <h3 className="mt-4 text-lg font-medium">Mapa de Ubicación</h3>
                                                <p className="mt-2 text-sm text-muted-foreground">
                                                    Aquí se mostrará un mapa con la última ubicación conocida de la mascota
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-sm font-medium">Dirección</h3>
                                        <p className="text-sm">{pet.location}</p>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="updates" className="space-y-4">
                                <div className="mt-4">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-sm font-medium">Actualizaciones y Avistamientos</h3>
                                        <Button className="bg-rose-500 hover:bg-rose-600" size="sm">
                                            Añadir Actualización
                                        </Button>
                                    </div>
                                    <div className="space-y-4">
                                        {pet.updates.map((update, index) => (
                                            <div key={index} className="rounded-lg border p-4">
                                                <div className="flex items-center justify-between mb-2">
                                                    <p className="font-medium">{update.author}</p>
                                                    <p className="text-xs text-muted-foreground">{new Date(update.date).toLocaleDateString()}</p>
                                                </div>
                                                <p className="text-sm">{update.content}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </TabsContent>

                        </Tabs>
                    </CardContent>
                </Card>
            </div>
        </div >
    )
}
