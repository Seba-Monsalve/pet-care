import { petApi } from "@/api/pet.api";

export const deletePetAction = async (id: string) => {
  const { data } = await petApi.delete(`pets/delete/${id}`);
  return data;
};
