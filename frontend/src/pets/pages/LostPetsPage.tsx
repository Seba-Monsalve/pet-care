import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin } from "lucide-react"
import { LostPetCard } from "../components/LostPetCard"
import { useLostPets } from "../hooks/useLostPets"


export default function LostPetsPage() {

    const { petsLostQuery } = useLostPets()
    const { data: lostPets = [], } = petsLostQuery


    // queryKey: ["lost-pets", {}],

    //     {
    //     "id": "6b69a23b-766f-414a-8aa7-0ce55962d770",
    //     "name": "Kiwi",
    //     "species": "Ave",
    //     "breed": "Periquito",
    //     "urlImage": "https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg",
    //     "isLost": true,
    //     "lostPetHistory": [
    //         {
    //             "location": "66",
    //             "status": "Perdido",
    //             "reward": 0,
    //             "lastSeen": "2025-05-23T14:32:37.549Z"
    //         }
    //     ]
    // }


    return (
        <div className="flex flex-col gap-4 p-3">

            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight">Mascotas Perdidas</h1>
                </div>
                {/* <Link to="/dashboard/lost-pets/report">
                    <Button className="bg-rose-500 hover:bg-rose-600">
                        <Plus className="mr-2 h-4 w-4" />
                        Reportar Mascota Perdida
                    </Button>
                </Link> */}
            </div>

            {/* BARRA BUSQUEDA */}
            {/* TODO */}
            {/* <Card>
                <CardHeader>
                    <CardTitle>Buscar Mascotas Perdidas</CardTitle>
                    <CardDescription>Filtra por ubicación, tipo de mascota o fecha de desaparición</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-4 md:flex-row">
                        <div className="relative flex-1">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input type="search" placeholder="Buscar por nombre, raza..." className="pl-8" />
                        </div>
                        <div className="flex flex-1 gap-4">
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Tipo de mascota" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todas</SelectItem>
                                    <SelectItem value="dog">Perros</SelectItem>
                                    <SelectItem value="cat">Gatos</SelectItem>
                                    <SelectItem value="other">Otros</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Estado" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todos</SelectItem>
                                    <SelectItem value="lost">Perdidos</SelectItem>
                                    <SelectItem value="found">Encontrados</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
            </Card> */}

            <Tabs defaultValue="grid" className="space-y-4">
                <div className="flex items-center justify-between">
                    <TabsList>
                        <TabsTrigger value="grid">Cuadrícula</TabsTrigger>
                        <TabsTrigger disabled value="map">Mapa</TabsTrigger>
                    </TabsList>
                    <div className="text-sm text-muted-foreground">
                        Mostrando <strong>{lostPets.length}</strong> mascotas perdidas
                    </div>
                </div>

                <TabsContent value="grid" className="space-y-4">
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {lostPets.map((pet) => (
                            <LostPetCard key={pet.id} pet={pet} />
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="map">
                    <Card>
                        <CardContent className="p-0">
                            <div className="relative h-[200px] w-full bg-muted">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center">
                                        <MapPin className="mx-auto h-12 w-12 text-muted-foreground" />
                                        <h3 className="mt-4 text-lg font-medium">Vista de Mapa</h3>
                                        <p className="mt-2 text-sm text-muted-foreground">
                                            Aquí se mostrará un mapa interactivo con la ubicación de las mascotas perdidas
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>



            {/* <Card>
                <CardHeader className="flex flex-row items-center">
                    <div className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-amber-500" />
                        <CardTitle>Alertas Recientes</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {lostPets
                            .filter((pet) => pet.status === "Perdido")
                            .slice(0, 3)
                            .map((pet) => (
                                <div key={pet.id} className="flex items-center gap-4 rounded-lg border p-3">
                                    <div className="relative h-16 w-16 overflow-hidden rounded-md">
                                        <img src={pet.imageUrl || "/placeholder.svg"} alt={pet.name} className="object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-medium">{pet.name}</h3>
                                            <Badge variant={pet.status === "Perdido" ? "destructive" : "outline"}>{pet.status}</Badge>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <MapPin className="h-3 w-3" />
                                            <span>{pet.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Calendar className="h-3 w-3" />
                                            <span>Visto por última vez: {new Date(pet.lastSeen).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                    <Link to={`/dashboard/lost-pets/${pet.id}`}>
                                        <Button variant="outline" size="sm">
                                            Ver detalles
                                        </Button>
                                    </Link>
                                </div>
                            ))}
                    </div>
                </CardContent>
            </Card> */}
        </div>
    )
}
