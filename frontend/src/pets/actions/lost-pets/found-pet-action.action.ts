import { petApi } from "@/api/pet.api";

export const foundPetAction = async (pet: any) => {
  const { data } = await petApi.post(`lost-pets/foundPet/${pet.id}`, pet);
  return data;
};
