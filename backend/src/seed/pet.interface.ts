export interface Pet {
  name: string;
  ownerId: string;
  species: string;
  sex: "hembra" | "macho";
  color: string;
  weight: number;
  sterilized: boolean;
  isActive: boolean;
  breed: string;
  urlImage: null;
  dob: Date;
  notes: any[];
  microchip: string;
}
