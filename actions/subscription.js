// // "use server";

// import { createClient } from "@supabase/supabase-js";

// // import { revalidatePath } from "next/cache";

// export const supabaseAdmin = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL,
//   process.env.SUPABASE_SERVICE_KEY
// );

// export const getUserSubscription = async (userId) => {
//   //   try {
//   //     const {
//   //       data: { subscription_plan },
//   //       error,
//   //     } = await supabaseAdmin
//   //       .from("profiles")
//   //       .select("subscription_plan")
//   //       .eq("id", userId)
//   //       .maybeSingle(); //

//   //     if (error) {
//   //       return "inactive";
//   //     } else {
//   //       return subscription_plan;
//   //     }
//   //   } catch (error) {
//   //     console.error("Failed to fetch subscription:", error.message);
//   //     return "inactive"; // Default on error
//   //   }

//   return "inactive"; // Default value, replace with actual logic if needed
// };
