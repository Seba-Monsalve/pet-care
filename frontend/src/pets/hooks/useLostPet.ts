import { useQuery } from "@tanstack/react-query";
import { getLostPet } from "../actions";

export const useLostPet = (petId: string) => {
  const lostPetQuery = useQuery({
    queryKey: ["lost-pets", { petId }],
    queryFn: () => getLostPet(petId),
    staleTime: 1000 * 60,
    // retry: false,
  });

  return { lostPetQuery };
};
