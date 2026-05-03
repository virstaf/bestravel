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
          const { profile: userProfile, success, error: profileError } = await getProfileAction(authUser?.id);

          if (authUser) {
            // We have a session, so the user IS authenticated
            set({ isAuthenticated: true });

            if (userProfile) {
              const plan =
                userProfile.subscription_plan !== "inactive"
                  ? userProfile.subscription_plan
                  : null;
              const expiresAt = getFormattedDateTime(
                userProfile.subscription_end || userProfile.trial_ends_at
              );
              set({ user: userProfile });
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
            } else if (profileError) {
              console.warn("Could not fetch profile, but user has session:", profileError);
              // Keep isAuthenticated: true, but user might be null or partial
              // We could set a placeholder user if we have authUser data
              set({ 
                user: { 
                  id: authUser.id, 
                  email: authUser.email,
                  is_partial: true 
                } 
              });
            }
          } else {
            // No auth user found
            set({ isAuthenticated: false, user: null, isSubscribed: false, subscription: null });
          }
        } catch (error) {
          console.error("Error in fetchUser:", error);
          set({ isAuthenticated: false, user: null });
        } finally {
          set({ isLoading: false });
        }
      },
    }),
  //   {
  //     name: "user-storage", // unique name for the storage
  //     // storage: createJSONStorage(() => localStorage), // use localStorage for persistence
  //   }
  // )
);

export default useUserStore;
