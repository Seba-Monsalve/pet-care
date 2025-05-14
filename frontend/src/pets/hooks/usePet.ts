import { useQuery } from "@tanstack/react-query";
import { getPet } from "../actions";

export const usePet = (petId: string) => {
  const petQuery = useQuery({
    queryKey: ["pet", { petId }],
    queryFn: () => getPet(petId),
    staleTime: 1000 * 60,
    // retry: false,
  });

  return { petQuery };
};
