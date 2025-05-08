import Footer from "@/components/Footer";
import NavSection from "@/components/NavSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <>
      <NavSection />
      <main className="container mx-auto h-screen flex flex-col justify-center items-center gap-4">
        <h2 className="text-red-500 font-bold">Page Not Found!</h2>
        <Button asChild>
          <Link href="/dashboard">Return to home</Link>
        </Button>
      </main>
      <Footer />
    </>
  );
};

export default NotFound;
