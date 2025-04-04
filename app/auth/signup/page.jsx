import { Button } from "@/components/ui/button";
import SignupForm from "@/components/ui/signupForm";
import Link from "next/link";

const SignupPage = () => {
  return (
    <div className="w-full h-screen relative grid lg:grid-cols-2 items-center justify-center">
      <div className="absolute top-5 left-10">
        <Link href="/">
          <span className="font-bold text-2xl text-green-600">Bestravel</span>
        </Link>
      </div>
      <div className="absolute bottom-10 left-10 hidden lg:block max-w-[450px]">
        <p className="text-white text-xl">
          "The VIP lounge access made my airport experience so much better!"
        </p>
        <p className="text-amber-100 text-lg">- David R.</p>
      </div>
      <div className="absolute right-10 top-5">
        <Link href="/auth/login" className="text-sm !underline">
          Login?
          {/* <Button variant="secondary">Login</Button> */}
        </Link>
      </div>
      <div className="w-full h-full hidden bg-primary lg:block overflow-hidden"></div>
      <div className="form flex items-center justify-center w-full h-full">
        <SignupForm />
      </div>
    </div>
  );
};

export default SignupPage;
