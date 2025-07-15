import React from "react";

export default function ProfileLayout({ children }) {
  return (
    <div className="layout">
      <main>{children}</main>
    </div>
  );
}
