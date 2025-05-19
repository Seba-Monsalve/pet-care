import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getLostPets } from "../actions";

export const useLostPets = () => {
  const [page, setpage] = useState(1);

  const petsLostQuery = useQuery({
    queryKey: ["lost-pets", {}],
    queryFn: () => getLostPets(),
    staleTime: 1000 * 60,
  });

  const nextPage = () => {
    if (!petsLostQuery.data || petsLostQuery.data.length === 0) return;
    setpage((prev) => prev + 1);
  };

  const previousPage = () => {
    if (page > 1) setpage((prev) => prev - 1);
  };

  return {
    petsLostQuery,
    nextPage,
    previousPage,
    page,
  };
};
