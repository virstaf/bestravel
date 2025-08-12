import useUserStore from "@/user.store";
import { redirect } from "next/navigation";

export const AdminGuard = async ({ children }) => {
  const { isLoading, fetchUser, user } = useUserStore.getState();

  await fetchUser();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    ); // or a spinner component
  }

  if (!isLoading && !user) {
    console.error("auth err!");
    redirect("/auth/login");
  }

  if (user && user?.role !== "ADMIN") {
    redirect("/dashboard"); // Redirect to home or an error page
  }

  if (user) {
    return <>{children}</>;
  }

  //   return <>{children}</>;
};
