import React from "react";

export default function AdminLayout({ children }) {
  return (
    <div className="bg-slate-900 h-screen text-white">
      <main>{children}</main>
    </div>
  );
}
