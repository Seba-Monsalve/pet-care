import { petApi } from "@/api/pet.api";
import { Pet } from "../../interface/pet.interface";

export const getLostPets = async (): Promise<Pet[]> => {
  const { data } = await petApi.get<Pet[]>("/lost-pets");
  return data;
};
