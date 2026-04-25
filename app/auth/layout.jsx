import { getUser } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import CookieWarning from "@/components/ui/CookieWarning";

export default async function AuthLayout({ children }) {
  try {
    const user = await getUser();
    if (user) {
      redirect("/dashboard");
    }
  } catch (error) {}

  return (
    <div className="layout">
      <CookieWarning />
      <main>{children}</main>
    </div>
  );
}
