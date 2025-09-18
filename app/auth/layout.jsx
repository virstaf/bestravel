import { getUser } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

export default async function AuthLayout({ children }) {
  const user = await getUser();
  if (user) {
    redirect("/dashboard");
  }
  return (
    <div className="layout">
      <main>{children}</main>
    </div>
  );
}
