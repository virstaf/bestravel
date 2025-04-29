import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { JoinDialog } from "./JoinDialog";

const CtaBanner = () => {
  return (
    <section className="w-full bg-gradient-to-r from-blue-500 to-teal-400 text-white py-16 px-6 text-center">
      <h2 className="text-3xl font-bold mb-4">
        Ready to Save on Your Next Getaway?
      </h2>
      <JoinDialog
        ButtonText={"Request Custom Travel Experience"}
        className="mt-4 bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
      />
      {/* <Button
        asChild
        className="mt-4 bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
      >
        <Link href="/auth/signup">Join Now – Unlock Your Perks</Link>
      </Button> */}
    </section>
  );
};

export default CtaBanner;
