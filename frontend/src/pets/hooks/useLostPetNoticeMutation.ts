import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLostPetNoticeAction } from "../actions/lost-pets/create-lost-pet-notice.action";
import { LostPetHistory, Pet, } from "../interface/pet.interface";
import { foundPetAction } from "../actions/lost-pets/found-pet-action.action";

export const useLostPetNoticeMutation = () => {
  const queryClient = useQueryClient();

  const createLostPetNotice = useMutation({
    mutationFn: createLostPetNoticeAction,
    onMutate: async (data) => {

      console.log('createLostPetNotice');
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

      // queryClient.setQueryData(["pet", { petId: pet.id }],
      //   (oldData: any) => {

      //     return {
      //       ...oldData,
      //       isLost: true,
      //       lostPetHistory: oldData.lostPetHistory.map((history: LostPetHistory) => {
      //         if (history.status == 'Perdido') {
      //           return {
      //             id: history.id,
      //             status: "Perdido",
      //             ...rest,
      //           }
      //         }
      //         return history
      //       })
      //     }
      //   }

      // );

      // queryClient.setQueryData(["pets", {}], (oldData: any) => {
      //   if (oldData) {
      //     return oldData.map((insertedPet: Pet) => {
      //       return insertedPet.id === optimisticLostPet.id
      //         ? optimisticLostPet
      //         : insertedPet;
      //     });
      //   }
      //   return [optimisticLostPet];
      // });

      // queryClient.setQueryData(["lost-pets", {}], (oldData: any) => {
      //   if (oldData) {
      //     return [
      //       ...oldData.filter((insertedPet: Pet) => {
      //         return insertedPet.id !== optimisticLostPet.id
      //       }),
      //       optimisticLostPet
      //     ]
      //   }
      //   return [
      //     optimisticLostPet
      //   ];
      // });
      // queryClient.setQueryData(["lost-pets", { petId: optimisticLostPet.id }], () => {
      //   const newHistory = pet.lostPetHistory.map((history: LostPetHistory) => {
      //     if (history.status == 'Perdido') {
      //       return {
      //         id: history.id,
      //         status: "Perdido",
      //         ...rest,
      //       }
      //     }
      //     return history
      //   })


      //   return {
      //     ...pet,
      //     isLost: true,
      //     lostPetHistory: pet.lostPetHistory.length == 0 ? [{ ...rest, status: "Perdido", }] : newHistory
      //   }
      // });


      console.log({ pet });
      console.log({ petId: pet.id });

      queryClient.refetchQueries({ queryKey: ["lost-pets"] });
      queryClient.refetchQueries({ queryKey: ["lost-pets", { petId: pet.id }] });
      queryClient.refetchQueries({ queryKey: ["pet", { petId: pet.id }] });
      queryClient.refetchQueries({ queryKey: ["pets", {}] });
    },

    onSuccess: (updatedPet, _, ___) => {

      queryClient.setQueryData(["pet", { petId: updatedPet.id }], () => {
        return { ...updatedPet };
      });
      // },
      // console.log('createLostPetNotice success');
      // console.log({ updatedPet });

      // queryClient.refetchQueries({ queryKey: ["lost-pets"] });
      // queryClient.refetchQueries({ queryKey: ["lost-pets", { petId: updatedPet.petId }] });
      // queryClient.refetchQueries({ queryKey: ["pet", { petId: updatedPet.petId }] });
      // queryClient.refetchQueries({ queryKey: ["pets", {}] });
    },

    onError: (_, __, ___) => {
      //Invalidate and refetch
      // queryClient.invalidateQueries({
      //   queryKey: ["Pets", { filterKey: data.category }],
      // });
      console.log('error creating lost pet notice');
      console.log(_);
    },
  });


  const foundPetNotice = useMutation({

    mutationFn: foundPetAction,
    onMutate: async (data) => {

      console.log('foundPetNotice');
      const { pet, ...rest } = data


      // queryClient.setQueryData(["pet", { petId: pet.id }], (oldData: any) => {
      //   return {
      //     ...oldData,
      //     isLost: false,
      //     lostPetHistory: oldData.lostPetHistory.map((history: LostPetHistory) => {
      //       if (history.status == 'Perdido') {
      //         return {
      //           status: "Encontrado",
      //           ...rest,
      //         }
      //       }
      //       return history
      //     })
      //   }
      // }
      // )
      // queryClient.setQueryData(["pets", {}], (oldData: any) => {

      //   if (oldData) {
      //     return oldData.map((insertedPet: Pet) => {
      //       return insertedPet.id === pet.id
      //         ? { ...insertedPet, isLost: false }
      //         : insertedPet;
      //     });
      //   }
      //   return [pet];
      // }
      // )
      // queryClient.setQueryData(["lost-pets", {}], (oldData: any) => {
      //   if (oldData) {
      //     return [
      //       ...oldData.filter((insertedPet: Pet) => {
      //         return insertedPet.id !== pet.id
      //       })
      //     ]
      //   }
      //   return [];
      // });
      // queryClient.setQueryData(["lost-pets", { petId: pet.id }], () => {
      //   return {
      //     ...pet,
      //     isLost: false,
      //     lostPetHistory: pet.lostPetHistory.map((history: LostPetHistory) => {
      //       if (history.status == 'Perdido') {
      //         return {
      //           status: "Encontrado",
      //           ...rest,
      //         }
      //       }
      //       return history
      //     })
      //   }
      // });

      console.log({ revision: 'asd', pet });

      queryClient.refetchQueries({ queryKey: ["lost-pets"] });
      queryClient.refetchQueries({ queryKey: ["lost-pets", { petId: pet.id }] });
      queryClient.refetchQueries({ queryKey: ["pet", { petId: pet.id }] });
      queryClient.refetchQueries({ queryKey: ["pets", {}] });


    }
    , onSuccess: (updatedPet, _, ___) => {

      queryClient.refetchQueries({ queryKey: ["lost-pets", { petId: updatedPet.petId }] });
      queryClient.refetchQueries({ queryKey: ["pet", { petId: updatedPet.petId }] });

    },

    onError: (_, __, ___) => {
      //Invalidate and refetch
      // queryClient.invalidateQueries({
      //   queryKey: ["Pets", { filterKey: data.category }],
      // });
    },
  });

  return { createLostPetNotice, foundPetNotice };
};
