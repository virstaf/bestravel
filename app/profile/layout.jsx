import { ProfileProvider } from "@/contexts/profile";
import React from "react";

export default function ProfileLayout({ children }) {
  return (
    <div className="layout">
      <main>
        <ProfileProvider>{children}</ProfileProvider>
      </main>
    </div>
  );
}
