import { petApi } from "@/api/pet.api";

export const updatePetAction = async ({
  pet,
  id,
}: {
  pet: any;
  id: string;
}) => {
  const { data } = await petApi.patch(`pets/update/${id}`, pet);
  return data;
};
