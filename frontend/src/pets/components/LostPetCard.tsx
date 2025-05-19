import { Card, CardContent, } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar } from "lucide-react"
import { useNavigate } from "react-router"




export function LostPetCard({ pet }: any) {
    const navigate = useNavigate()

    const { reward, location, lastSeen } = pet.lostPetHistory[0]
    return (
        <Card className="overflow-hidden hover:shadow-md transition-shadow gap-2 py-0 cursor-pointer" onClick={() => {
            navigate(`/dashboard/lost-pets/${pet.id}`)
        }}>
            <div className="relative aspect-square h-[170px]">
                <Badge variant={pet.isLost ? "destructive" : "default"} className={` ${!pet.isLost && 'bg-green-400'} absolute top-2 right-2 z-10`}>
                    {pet.isLost ? "Perdido" : "Encontrado"}
                </Badge>
                {reward && (
                    <Badge variant="outline" className="absolute top-2 left-2 z-10 bg-white/90 font-semibold text-black">
                        Recompensa: {reward}
                    </Badge>
                )}
                <div
                    className="absolute inset-0 bg-center bg-cover rounded"
                    style={{
                        backgroundImage: `url(${pet.urlImage || "/placeholder.svg"})`,
                    }}
                />
            </div>
            <CardContent className="px-4 py-2 flex flex-row items-center justify-between gap-4">
                <div className="flex flex-col gap-2">

                    <div className="mb-2">
                        <h3 className="text-lg font-bold">{pet.name}</h3>
                        <p className="text-sm text-muted-foreground">
                            {pet.species} - {pet.breed}
                        </p>
                    </div>
                    <div className="space-y-2 text-sm  line-clamp-2 ">
                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-rose-500" />
                            <span className="truncate">{location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-rose-500" />
                            <span>Visto: {new Date(lastSeen).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>


            </CardContent>

        </Card >
    )
}
