// "use client";
// // contexts/SubscriptionContext.js

// import { getUserSubscription } from "@/actions/subscription";
// import { getUser } from "@/lib/supabase/server";
// import { createContext, useContext, useEffect, useState } from "react";

// const SubscriptionContext = createContext();

// export function SubscriptionProvider({ children }) {
//   const [userId, setUserId] = useState(null); // Replace with your auth logic to get user ID
//   const [subscription, setSubscription] = useState({
//     plan: "inactive", // Default
//     isLoading: true,
//     error: null,
//   });

//   useEffect(() => {
//     const fetchUser = async () => {
//       const { data: user, error } = await getUser(); // Replace with your auth logic to get user
//       if (error) {
//         console.error("Failed to fetch user:", error.message);
//         return null;
//       }
//       setUserId(user?.id);
//     };
//     fetchUser(); // Fetch user on mount
//   }, []);

//   const fetchPlan = async (userId) => {
//     console.log("Fetching subscription for user:", userId);
//     if (!userId) {
//       setSubscription({
//         plan: "inactive",
//         isLoading: false,
//         error: "User not authenticated",
//       });
//       return;
//     }

//     try {
//       const { plan } = await getUserSubscription(userId); // Replace with your auth logic to get user ID
//       console.log("User subscription plan:", plan);

//       if (!plan) {
//         console.error("Failed to fetch subscription:");
//         setSubscription({
//           plan: "inactive",
//           isLoading: false,
//           error: "No subscription found",
//         });
//       }
//       setSubscription({
//         plan,
//         isLoading: false,
//         error: null,
//       });
//     } catch (error) {
//       setSubscription({
//         plan: "inactive",
//         isLoading: false,
//         error: error.message,
//       });
//     }
//   };

//   // Auto-fetch when user changes (e.g., login/logout)
//   useEffect(() => {
//     if (userId) fetchPlan(userId); // Replace `userId` with your auth logic
//   }, [userId]);

//   return (
//     <SubscriptionContext.Provider value={{ subscription, refetch: fetchPlan }}>
//       {children}
//     </SubscriptionContext.Provider>
//   );
// }

// export const useSubscription = () => useContext(SubscriptionContext);
