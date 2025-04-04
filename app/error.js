"use client";

import Footer from "@/components/Footer";
import NavSection from "@/components/NavSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";

const Error = ({ error, reset }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <>
      <NavSection />
      <main className="container mx-auto h-screen flex flex-col justify-center items-center gap-4">
        <h2 className="text-red-500 font-bold">Something went wrong!</h2>
        <div className="flex gap-4">
          <Button onClick={() => reset()}>Try again</Button>
          <Button variant="outline" asChild>
            <Link href="/">Return to home</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Error;
