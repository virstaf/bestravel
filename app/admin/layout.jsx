import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { AdminGuard } from "@/components/admin-guard";

export default function AdminLayout({ children }) {
  return (
    <AdminGuard>
      <SidebarProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </AdminGuard>
  );
}
