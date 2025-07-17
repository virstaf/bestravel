// import { useEffect, useState } from "react";
// import { useProfileContext } from "@/contexts/profile";

// export const useCurrentUserEmail = () => {
//   const [email, setEmail] = useState(null);
//   const { profile, isLoading } = useProfileContext();

//   useEffect(() => {
//     const fetchUserEmail = async () => {
//       if (isLoading || !profile) return;

//       const userEmail = profile.email;
//       setEmail(userEmail);
//     };

//     fetchUserEmail();
//   }, [profile]);

//   return email;
// };
