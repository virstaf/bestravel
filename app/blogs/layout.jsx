import LandingFooter from "@/components/LandingFooter";
import NavBar from "@/components/nav-bar";
import React from "react";

export default function Layout({ children }) {
  return (
    <div className=" layout">
      <NavBar />
      <main className="min-h-screen mt-16">{children}</main>
      <LandingFooter />
    </div>
  );
}
