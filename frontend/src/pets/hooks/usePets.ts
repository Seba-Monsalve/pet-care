import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getPets } from "../actions/get-pets.action";

export const usePets = () => {
  const [page, setpage] = useState(1);

  const petsQuery = useQuery({
    queryKey: ["pets", {}],
    queryFn: () => getPets(),
    staleTime: 1000 * 60,
  });

  const nextPage = () => {
    if (!petsQuery.data || petsQuery.data.length === 0) return;
    setpage((prev) => prev + 1);
  };

  const previousPage = () => {
    if (page > 1) setpage((prev) => prev - 1);
  };

  return {
    petsQuery,
    nextPage,
    previousPage,
    page,
  };
};
