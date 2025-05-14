import { useQueryClient } from "@tanstack/react-query";
import { getPet } from "../actions";

export const usePrefetchPet = () => {
  const queryClient = useQueryClient();
  const refetchPet = (petId: string) =>
    queryClient.prefetchQuery({
      queryKey: ["pet", { petId }],
      queryFn: () => getPet(petId),
      staleTime: 5000 * 60, //5 minute
    });

  return refetchPet;
};
