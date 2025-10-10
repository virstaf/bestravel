import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { getUser } from "./lib/supabase/server";
import { getProfileAction } from "./actions/profiles";
import { getFormattedDateTime } from "./lib/getFormattedDate";

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
        set({ isLoading: true });
        try {
          const authUser = await getUser();
          const { profile: userProfile } = await getProfileAction(authUser?.id);

          if (authUser && userProfile) {
            const plan =
              userProfile.subscription_plan !== "inactive"
                ? userProfile.subscription_plan
                : null;
            const expiresAt = getFormattedDateTime(
              userProfile.subscription_end || userProfile.trial_ends_at
            );
            set({ isAuthenticated: true, user: userProfile });
            if (plan) {
              set({
                isSubscribed: true,
                subscription: {
                  plan,
                  expiresAt,
                },
              });
            } else {
              set({ isSubscribed: false, subscription: null });
            }
          } else {
            set({ isAuthenticated: false, user: null });
          }
        } catch (error) {
          console.error("Error fetching user:", error);
          set({ isAuthenticated: false, user: null });
        } finally {
          set({ isLoading: false });
        }
        set({ isLoading: false });
      },
    }),
  //   {
  //     name: "user-storage", // unique name for the storage
  //     // storage: createJSONStorage(() => localStorage), // use localStorage for persistence
  //   }
  // )
);

export default useUserStore;
