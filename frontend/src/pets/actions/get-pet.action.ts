import { petApi } from "@/api/pet.api";
import { Pet } from "../interface/pet.interface";

export const getPet = async (petId: string): Promise<Pet | null> => {
  try {
    const { data } = await petApi.get<Pet>(`/pets/${petId}`);
    return data;
  } catch (error) {
    return null;
  }
};
