import { userApi } from "@/api/user.api";
import { User } from "@/auth/interfaces/user.interface";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface StoreState {
  user: User | null;
  isLoading: boolean;
  error: null | string;
  message: null | string;
  isFetchingUser: boolean;
  signUp: ({}: { username: string; email: string; password: string }) => void;
  login: ({}: { email: string; password: string }) => any | void;
  fetchUser: () => void;
  logout: () => any;
}

export const useAuthStore = create<StoreState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      error: null,
      message: null,
      isFetchingUser: true,

      signUp: async ({
        username,
        email,
        password,
      }: {
        username: string;
        email: string;
        password: string;
      }) => {
        set({ isLoading: true, message: null, error: null });
        try {
          const res = await userApi.post(`auth/signup`, {
            username,
            email,
            password,
          });

          if (!res.data.ok) {
            set({ user: null, isLoading: false, message: res.data.message });
            return;
          }
          set({
            user: res.data.user,
            isLoading: false,
            message: res.data.message,
          });
        } catch (error) {
          //console.log((error as any).response.data.message);
          set({
            isLoading: false,
            error: "Error Signing user",
          });
        }
      },

      login: async ({ email, password }) => {
        set({ isLoading: true, message: null, error: null });
        try {
          const res = await userApi.post(`auth/login`, {
            email,
            password,
          });

          const { user, message, ok, error } = res.data;

          if (!ok) {
            set({ user: null, isLoading: false, message: error });
            return;
          }
          set({
            user: user,
            isLoading: false,
            message: message,
            error: null,
          });
          return { user, message };
        } catch (error) {
          //console.log((error as any).response.data.message);
          set({
            isLoading: false,
            error: "Error Login user",
          });

          return { isLoading: false, error: "Error Login user" };
        }
      },

      fetchUser: async () => {
        set({ isFetchingUser: true, message: null });
        try {
          const res = await userApi.get(`auth/fetch-user`);

          if (!res.data.ok) {
            set({
              user: null,
              isFetchingUser: false,
              message: res.data.message,
            });
            return;
          }
          set({
            user: res.data.user,
            isFetchingUser: false,
            message: res.data.message,
            error: null,
          });
        } catch (error) {
          set({
            isFetchingUser: false,
            error:
              (error as any).response.data.message || "Error fetching user",
          });
        }
      },
      logout: async () => {
        set({ user: null, error: null, message: null, isLoading: true });
        try {
          const res = await userApi.post(`auth/logout`);
          const { message } = res.data;
          set({ message, isLoading: false, user: null });
          return { message };
        } catch (error) {
          set({ user: null, error: null, message: null, isLoading: false });

          //console.log((error as any).response.data.message);
          return {
            error: "Error logging out",
          };
        }
      },
    }),
    {
      name: "user-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
