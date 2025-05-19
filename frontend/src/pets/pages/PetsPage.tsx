import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, ListCollapse, } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { differenceInMonths, differenceInYears } from "date-fns";
import { usePets } from "../hooks/";
import { Loading } from "@/common/components/Loading";
import { Pet } from "../interface/pet.interface";
import { usePrefetchPet } from "../hooks/usePrefetchPet";
import { Badge } from "@/components/ui";

export default function PetsPage() {
  const { petsQuery } = usePets();
  const navigate = useNavigate();
  const prefetchPet = usePrefetchPet();

  const { data: pets, isFetching, error } = petsQuery;

  if (error) navigate("/");

  if (isFetching) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-6 py-2">
      <div className="flex items-center justify-between px-5">
        <h1 className="text-3xl font-bold tracking-tight">Mascotas</h1>
        <Link to="/dashboard/pets/new">
          <Button variant={"default"}>
            <Plus className="mr-2 h-4 w-4" />
            Nueva Mascota
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gestión de Mascotas</CardTitle>
          <CardDescription>
            Administra todas las mascotas registradas en el sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            {/* filstros y busquda */}
            {/* <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex w-full items-center gap-2 sm:w-auto">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar mascotas..."
                    className="w-full pl-8"
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                      <span className="sr-only">Filtrar</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Tipo de mascota</DropdownMenuItem>
                    <DropdownMenuItem>Edad</DropdownMenuItem>
                    <DropdownMenuItem>Propietario</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex items-center gap-2">
                <Select defaultValue="10">
                  <SelectTrigger className="w-[80px]">
                    <SelectValue placeholder="10" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  elementos por página
                </p>
              </div>
            </div> */}

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow className="text-center">
                    {/* <TableHead className="w-[80px]">ID</TableHead> */}
                    <TableHead />
                    <TableHead>
                      <div className="flex items-center gap-1">
                        Nombre
                        {/* <ArrowUpDown className="h-3 w-3" /> */}
                      </div>
                    </TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Raza</TableHead>
                    <TableHead>Edad</TableHead>
                    <TableHead>Propietario</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Última Revisión</TableHead>
                    <TableHead className="text-center">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pets!
                    .filter((pet: Pet) => pet.isActive)
                    .map((pet: Pet) => (
                      <TableRow
                        key={pet.id}
                        className="hover:bg-gray-100 items-center"
                        onMouseEnter={() => prefetchPet(pet.id)}
                      >
                        {/* <TableCell className="font-medium">{pet.id}</TableCell> */}
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-15 w-15 border-2 border-gray-300 shadow-md">
                              <AvatarImage
                                src={
                                  pet.urlImage ||
                                  `/assets/images/${pet.species.toLowerCase()}.jpg`
                                }
                                className="object-cover rounded-full"
                                alt={pet.name}
                              />
                              <AvatarFallback className="bg-gray-200 text-gray-600 font-bold">
                                {pet.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Link to={`/dashboard/pets/${pet.id}`}>
                              {pet.name}
                            </Link>
                          </div>
                        </TableCell>
                        <TableCell>{pet.species}</TableCell>
                        <TableCell>{pet.breed}</TableCell>
                        <TableCell>
                          <span>
                            {differenceInYears(new Date(), new Date(pet.dob)) >
                              0 &&
                              `
                            ${differenceInYears(
                                new Date(),
                                new Date(pet.dob)
                              )} años
                            `}
                          </span>
                          <span>
                            {` 
                        ${differenceInMonths(new Date(), new Date(pet.dob)) % 12
                              } meses
                        `}
                          </span>
                        </TableCell>

                        {/* <TableCell>{pet.owner}</TableCell> */}
                        {/* <TableCell>
                        <Badge
                          variant={
                            pet.isActive === "Activo" ? "default" : "secondary"
                          }
                        >
                          {pet.status}
                        </Badge>
                      </TableCell> */}
                        {/* <TableCell>
                        {new Date(pet.lastCheckup).toLocaleDateString()}
                      </TableCell> */}
                        <TableCell className="text-center">
                          {pet.owner?.username}
                        </TableCell>
                        <TableCell className="text-center">
                          {pet.isLost ? (
                            <Badge className="bg-red-500 text-white">
                              <span className="text-white">Perdido</span>
                            </Badge>
                          ) :
                            (
                              <Badge className="bg-green-500 text-white">
                                <span className="text-white">En casa</span>
                              </Badge>
                            )
                          }
                        </TableCell>
                        {/*!! TODO  arreglar la fecha */}
                        <TableCell className="text-center">
                          {/* TODO */}
                          {new Date().toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-center">
                          <Button
                            variant={"outline"}
                            onClick={() => {
                              navigate(`/dashboard/pets/${pet.id}`);
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                          >
                            <ListCollapse className="" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>

            {/* <div className="flex items-center justify-end">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div> */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
