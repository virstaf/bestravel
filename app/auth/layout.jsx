import { getUser } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

export default async function AuthLayout({ children }) {
  try {
    const user = await getUser();
    if (user) {
      redirect("/dashboard");
    }
  } catch (error) {}

  return (
    <div className="layout">
      <main>{children}</main>
    </div>
  );
}
