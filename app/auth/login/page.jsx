import { Button } from "@/components/ui/button";
import LoginForm from "@/components/ui/loginForm";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const LoginPage = () => {
  return (
    <div className="w-full h-screen relative grid lg:grid-cols-2 items-center justify-center">
      <div className="absolute top-5 left-10 ">
        <Link href="/" className="hover:scale-105">
          <Image
            src="/virstravel.png"
            alt="logo"
            width={805}
            height={310}
            // fill
            className="h-15 w-39 object-fit"
          />
        </Link>
      </div>
      <div className="absolute bottom-10 left-10 hidden lg:block max-w-[450px]">
        {/* <p className="text-white text-xl">
          "Virstravel Perks Club helped me save hundreds on my dream vacation!"
        </p>
        <p className="text-amber-100 text-lg">- Jessica M.</p> */}
      </div>
      <div className="absolute right-10 top-5">
        <Link
          href="/auth/signup"
          className="text-sm !underline hover:text-green-500"
        >
          Sign up?
          {/* <Button variant="secondary"></Button> */}
        </Link>
      </div>
      <div className="w-full h-full hidden bg-gray-500 lg:block overflow-hidden">
        <Image
          className="w-full h-full object-cover"
          src="/images/travel_portrait.jpg"
          // src="https://drive.google.com/uc?export=view&id=1b7OpxCqizKN66SkcQ5kE6ec9MK9MJHlW"
          width="2624"
          height="3280"
          optimize="true"
          alt="travel is good for the soul"
        />
      </div>
      <div className="form flex items-center justify-center w-full h-full">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
