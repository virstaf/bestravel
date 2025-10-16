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
        <div className="w-full min-h-[calc(100vh-180px)] mx-auto flex flex-col justify-center items-center text-center px-4">
          <h2 className="text-3xl font-bold mb-4">404 - Page Not Found</h2>
          <p className="mb-6">
            Oops! The page you're looking for doesn't exist.
          </p>
          <Link href="/dashboard">
            <Button>Take me Home?</Button>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default NotFound;
