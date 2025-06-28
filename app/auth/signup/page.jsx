import { Button } from "@/components/ui/button";
import SignupForm from "@/components/ui/signupForm";
import Image from "next/image";
import Link from "next/link";

const SignupPage = () => {
  return (
    <div className="w-full h-screen relative grid lg:grid-cols-2 items-center justify-center">
      <div className="absolute top-5 left-10">
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
        <p className="text-white text-xl">
          "The VIP lounge access made my airport experience so much better!"
        </p>
        <p className="text-amber-100 text-lg">- David R.</p>
      </div>
      <div className="absolute right-10 top-5">
        <Link
          href="/auth/login"
          className="text-sm !underline hover:text-green-500"
        >
          Login?
          {/* <Button variant="secondary">Login</Button> */}
        </Link>
      </div>
      <div className="w-full h-full hidden bg-primary lg:block overflow-hidden">
        <Image
          className="w-full h-full object-cover"
          src="/images/horses-in-cappadocia-under-sunlit-sky.jpg"
          width="3648"
          height="5472"
          alt="login_split_image"
        />
      </div>
      <div className="form flex items-center justify-center w-full h-full">
        <SignupForm />
      </div>
    </div>
  );
};

export default SignupPage;
