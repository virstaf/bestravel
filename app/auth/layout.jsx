import { getProfileAction } from "@/actions/profiles";
import { redirect } from "next/navigation";
import CookieWarning from "@/components/ui/CookieWarning";

export default async function AuthLayout({ children }) {
  try {
    const { profile } = await getProfileAction();
    if (profile) {
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
