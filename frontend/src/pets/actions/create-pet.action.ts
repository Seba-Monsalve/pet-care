import { petApi } from "@/api/pet.api";

export const createPetAction = async (pet: any) => {
  const { data } = await petApi.post(`pets/add`, pet);
  return data;
};
