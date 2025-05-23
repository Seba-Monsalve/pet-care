import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLostPetNoticeAction } from "../actions/lost-pets/create-lost-pet-notice.action";
import { LostPetHistory, Pet, } from "../interface/pet.interface";
import { foundPetAction } from "../actions/lost-pets/found-pet-action.action";
import { i } from "node_modules/react-router/dist/development/fog-of-war-D2zsXvum.d.mts";

export const useLostPetNoticeMutation = () => {
  const queryClient = useQueryClient();

  const createLostPetNotice = useMutation({
    mutationFn: createLostPetNoticeAction,
    onMutate: async (data) => {

      const { pet, ...rest } = data
      const optimisticLostPet = {
        ...pet,
        lostPetHistory: pet.lostPetHistory.length == 0 ? [{ ...rest, status: "Perdido", }] : [
          ...pet.lostPetHistory.map((history: LostPetHistory) => {

            if (history.status != 'Encontrado') {
              return {
                id: history.id,
                ...rest,
                status: "Perdido",
              }
            }
            else
              return history
          })
        ],
        isLost: true,
      };

      queryClient.setQueryData(["pet", { petId: optimisticLostPet.id }],
        optimisticLostPet
      );

      queryClient.setQueryData(["pets", {}], (oldData: any) => {
        if (oldData) {
          return oldData.map((insertedPet: Pet) => {
            return insertedPet.id === optimisticLostPet.id
              ? optimisticLostPet
              : insertedPet;
          });
        }
        return [optimisticLostPet];
      });

      queryClient.setQueryData(["lost-pets", {}], (oldData: any) => {
        console.log({ oldData });
        if (oldData) {
          return [
            ...oldData.filter((insertedPet: Pet) => {
              return insertedPet.id !== optimisticLostPet.id
            }),
            optimisticLostPet
          ]
        }
        return [
          optimisticLostPet
        ];
      });
      queryClient.setQueryData(["lost-pets", { petId: optimisticLostPet.id }], () => {
        const newHistory = pet.lostPetHistory.map((history: LostPetHistory) => {
          if (history.status == 'Perdido') {
            return {
              id: history.id,
              status: "Perdido",
              ...rest,
            }
          }
          return history
        })


        return {
          ...pet,
          isLost: true,
          lostPetHistory: pet.lostPetHistory.length == 0 ? [{ ...rest, status: "Perdido", }] : newHistory
        }
      });
    },

    onSuccess: (updatedPet, _, context) => {

      queryClient.setQueryData(["pet", { petId: updatedPet.id }], () => {
        return { ...updatedPet };
      });
    },

    onError: (_, __, context) => {
      //Invalidate and refetch
      // queryClient.invalidateQueries({
      //   queryKey: ["Pets", { filterKey: data.category }],
      // });
    },
  });


  const foundPetNotice = useMutation({

    mutationFn: foundPetAction,
    onMutate: async (data) => {

      const { pet, ...rest } = data
      const optimisticLostPet = {
        ...pet,
        isLost: false,
      };
      console.log({ rest });


      queryClient.setQueryData(["pet", { petId: optimisticLostPet.id }], (oldData: any) => {
        return {
          ...oldData,
          isLost: false,
          lostPetHistory: oldData.lostPetHistory.map((history: LostPetHistory) => {
            if (history.status == 'Perdido') {
              return {
                id: history.id,
                status: "Encontrado",
                ...rest,
              }
            }
            return history
          })
        }
      }
      );

      queryClient.setQueryData(["lost-pets", {}], (oldData: any) => {
        if (oldData) {
          return oldData.filter((insertedPet: Pet) => {
            return insertedPet.id !== optimisticLostPet.id
          })
        }
        return [];
      });
      queryClient.invalidateQueries({ queryKey: ["lost-pets", { petId: optimisticLostPet.id }] })
    },

    onSuccess: (updatedPet, _, context) => {

      queryClient.setQueryData(["pet", { petId: updatedPet.id }], () => {
        return { ...updatedPet };
      });
    },

    onError: (_, __, context) => {
      //Invalidate and refetch
      // queryClient.invalidateQueries({
      //   queryKey: ["Pets", { filterKey: data.category }],
      // });
    },
  });

  return { createLostPetNotice, foundPetNotice };
};
