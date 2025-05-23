import { petApi } from "@/api/pet.api";
import { Pet } from "../../interface/pet.interface";

export const getLostPet = async (petId: string): Promise<Pet | null> => {
  try {
    const { data } = await petApi.get<Pet>(`/lost-pets/${petId}`);
    console.log({ data });
    return data;
  } catch (error) {
    return null;
  }
};
