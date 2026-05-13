import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useUserStore = create(
  // persist(
    (set, get) => ({
      isLoading: false,
      isAuthenticated: false,
      user: null,
      subscription: null,
      isSubscribed: false,

      setIsLoading: (value) => set({ isLoading: value }),
      setIsAuthenticated: (value) => set({ isAuthenticated: value }),
      setUser: (user) => set({ user }),
      setSubscription: (subscription) => set({ subscription }),
      setIsSubscribed: (value) => set({ isSubscribed: value }),

      fetchUser: async () => {
        // fetchUser is disabled in client-side store to avoid server-side imports.
        // User state should be populated via ClientLayout or client-side API calls.
        console.warn("fetchUser called on client-side store. Use ClientLayout props instead.");
      },
    }),
  //   {
  //     name: "user-storage", // unique name for the storage
  //     // storage: createJSONStorage(() => localStorage), // use localStorage for persistence
  //   }
  // )
);

export default useUserStore;
