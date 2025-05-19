import { petApi } from "@/api/pet.api";
import { Pet } from "../../interface/pet.interface";

export const getPets = async (): Promise<Pet[]> => {
  const { data } = await petApi.get<Pet[]>("/pets");

  return data;
};
