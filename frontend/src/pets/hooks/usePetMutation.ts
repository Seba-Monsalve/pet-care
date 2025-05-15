import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPetAction, deletePetAction, updatePetAction } from "../actions";
import { Pet } from "../interface/pet.interface";

export const usePetMutation = () => {
  const queryClient = useQueryClient();

  const createPetMutation = useMutation({
    mutationFn: createPetAction,
    onMutate: async (data) => {
      const optimisticPet = {
        ...data,
        id: Date.now(),
      };

      queryClient.setQueryData(
        // ["pets", { filterKey: data.category }],
        ["pets", {}],
        (oldData: any) => {
          if (oldData) {
            return [...oldData, optimisticPet];
          }
          return [optimisticPet];
        }
      );

      return { optimisticPet };
    },
    onSuccess: (newPet, _, context) => {
      queryClient.removeQueries({
        queryKey: ["pets", context.optimisticPet.id],
      });

      queryClient.setQueryData(["pets", {}], (oldData: any) => {
        if (!oldData) {
          return [newPet];
        }
        return oldData.map((insertedPet: Pet) => {
          return insertedPet.id === context.optimisticPet.id
            ? newPet
            : insertedPet;
        });
      });
    },
    onError: (_, __, context) => {
      //Invalidate and refetch
      // queryClient.invalidateQueries({
      //   queryKey: ["Pets", { filterKey: data.category }],
      // });

      queryClient.removeQueries({
        queryKey: ["pet", context?.optimisticPet.id],
      });

      queryClient.setQueryData(
        // ["pets", { filterKey: context?.optimisticPet.category }],
        ["pets", {}],
        (oldData: any) => {
          if (!oldData) {
            return [];
          }
          return oldData.filter((insertedPet: Pet) => {
            return insertedPet.id !== context?.optimisticPet.id;
          });
        }
      );
    },
  });

  const updatePetMutation = useMutation({
    mutationFn: updatePetAction,
    onMutate: async (data) => {

      const { id, pet } = data;
      const optimisticPet = {
        id, ...pet
      };
      // console.log("optimisticPet", optimisticPet);
      queryClient.setQueryData(["pets", {}], (oldData: any) => {
        if (oldData) {
          oldData.map((insertedPet: Pet) => {
            if (insertedPet.id === id) {
              return { ...insertedPet, ...optimisticPet };
            }
            return insertedPet;
          });

        }
        return oldData;
      });
      queryClient.setQueryData(["pet", { petId: optimisticPet.id }], (oldData) => {
        if (oldData) {
          return { ...oldData, ...optimisticPet };
        }
      });
      return { optimisticPet };
    },
    onSuccess: (newPet, _, __) => {
      // console.log("Actualizado", optimisticPet);

      queryClient.setQueryData(["pet", { petId: newPet.id }], () => {
        return newPet;
      });

      queryClient.setQueryData(["pets", {}], (oldData: any) => {
        if (!oldData) {
          return [newPet];
        }
        return oldData.map((insertedPet: Pet) => {
          return insertedPet.id === newPet.id ? newPet : insertedPet;
        });
      });
    },
    onError: (_, __, ___) => {
      queryClient.setQueryData(["pets", {}], (oldData: any) => {
        return oldData.map((pet: Pet) => pet);
      });
    },
  });

  const deletePetMutation = useMutation({
    mutationFn: deletePetAction,
    onMutate: async (id) => {
      return id;
    },
    onSuccess: (_, __, context) => {
      //Invalidate and refetch
      // queryClient.invalidateQueries({
      //   // queryKey: ["pets", { filterKey: data.category }],
      //   queryKey: ["pets", {}],
      // });

      queryClient.removeQueries({
        queryKey: ["pet", { context }],
      });
      queryClient.setQueryData(
        // ["pets", { filterKey: newPet.category }],
        ["pets", {}],
        (oldData: any) => {
          if (!oldData) {
            return [];
          }
          return oldData.filter((insertedPet: Pet) => {
            return insertedPet.id !== context;
          });
        }
      );
    },
    onError: (_, __, ___) => {
      //Invalidate and refetch
      // queryClient.invalidateQueries({
      //   queryKey: ["Pets", { filterKey: data.category }],
      // });

      queryClient.setQueryData(["pets", {}], (oldData: any) => {
        return oldData;
      });
    },
  });
  return { createPetMutation, updatePetMutation, deletePetMutation };
};
