"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Error = ({ error, reset }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const router = useRouter();

  return (
    <>
      <main className="container mx-auto h-screen flex flex-col justify-center items-center gap-4">
        <h2 className="text-red-500 font-bold">Something went wrong!</h2>
        <div className="flex gap-4">
          <Button onClick={() => router.refresh()}>Try again</Button>
          <Button variant="outline" asChild>
            <Link href="/">Return to home</Link>
          </Button>
        </div>
      </main>
    </>
  );
};

export default Error;
