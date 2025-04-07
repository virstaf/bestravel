import { Button } from "@/components/ui/button";
import LoginForm from "@/components/ui/loginForm";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const LoginPage = () => {
  return (
    <div className="w-full h-screen relative grid lg:grid-cols-2 items-center justify-center">
      <div className="absolute top-5 left-10">
        <Link href="/">
          <span className="font-bold text-2xl text-green-600">Bestravel</span>
        </Link>
      </div>
      <div className="absolute bottom-10 left-10 hidden lg:block max-w-[450px]">
        <p className="text-white text-xl">
          "Bestravel Perks Club helped me save hundreds on my dream vacation!"
        </p>
        <p className="text-amber-100 text-lg">- Jessica M.</p>
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
      <div className="w-full h-full hidden lg:block overflow-hidden">
        <Image
          className="w-full h-full object-cover"
          src="/images/new-york.jpg"
          width="640"
          height="853"
          alt="login_image"
        />
      </div>
      <div className="form flex items-center justify-center w-full h-full">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
