import { petApi } from "@/api/pet.api";

export const createLostPetNoticeAction = async (pet: any) => {
  const { data } = await petApi.post(`lost-pets/add`, pet);
  return data;
};
