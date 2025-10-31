import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import AdminNav from "@/components/admin/AdminNav";
import { getUser } from "@/lib/supabase/server";
import { getProfileAction } from "@/actions/profiles";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }) {
  const user = await getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { profile } = await getProfileAction();

  if (profile?.role === "USER") {
    redirect("/dashboard");
  }
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="relative w-full min-h-screen flex flex-col">
        {/* <SidebarTrigger /> */}
        <AdminNav />
        {children}
      </main>
    </SidebarProvider>
  );
}
