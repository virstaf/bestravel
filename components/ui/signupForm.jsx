"use client";

import { useEffect, useState, useTransition } from "react";
import { redirect, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { googleAuthAction, signupAction } from "@/actions/users";
import { getUser } from "@/lib/supabase/server";
import Image from "next/image";
import { EyeClosed } from "lucide-react";
import { Eye } from "lucide-react";

const formSchema = z.object({
  fullname: z
    .string()
    .min(3, {
      message: "Fullname must be at least 3 characters",
    })
    .max(40)
    .refine(
      (value) => {
        const words = value.trim().split(/\s+/);
        return words.length >= 2 && words.length <= 3;
      },
      {
        message: "Fullname must contain 2 or 3 words",
      },
    ),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "password must contain at least 8 characters!" })
    .max(40),
  confirmPassword: z
    .string()
    .min(8, { message: "password must contain at least 8 characters!" })
    .max(40),
});

const SignupForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const userObject = await getUser();

      if (userObject) {
        redirect("/dashboard");
      }
    };
    fetchUser();
  }, []);

  async function onSubmit(values) {
    const { password } = values;
    const { confirmPassword } = values;
    if (password !== confirmPassword) {
      alert(password, confirmPassword);
      toast.error("Error", { description: "Passwords do not match" });
      return;
    }

    startTransition(async () => {
      const { email } = values;

      const { fullname } = values;

      let errorMessage;
      let title;
      let description;

      errorMessage = (await signupAction(email, password, fullname))
        .errorMessage;
      title = "Check your email! 📧";
      description =
        "We've sent you a confirmation link. Please check your email and click the link to verify your account, then you can continue with onboarding.";

      if (!errorMessage) {
        toast.success(title, {
          description: description,
          duration: 8000, // Show for 8 seconds
        });
        // Don't redirect - keep user on page to see the message
        // After email confirmation, they'll be redirected to onboarding
      } else {
        toast.error("Error", { description: errorMessage });
      }
    });
  }

  const handleGoogleAuth = async () => {
    startTransition(async () => {
      try {
        await googleAuthAction();
      } catch (error) {}
    });
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  return (
    <div className="w-full max-w-[450px] mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-8 ">
          <div className="flex flex-col gap-1">
            <h3 className="text-2xl font-medium text-center">
              Create an account
            </h3>
            <p className="text-muted-foreground text-center">
              Enter your details below to create your account
            </p>
          </div>
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Full Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="example@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="relative">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type={showPassword ? "text" : "password"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute bottom-1 right-2 cursor-pointer"
            >
              <span className="text-muted-foreground">
                {showPassword ? <EyeClosed /> : <Eye />}
              </span>
            </div>
          </div>
          <div className="relative">
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute bottom-1 right-2 cursor-pointer"
            >
              <span className="text-muted-foreground">
                {showConfirmPassword ? <EyeClosed /> : <Eye />}
              </span>
            </div>
          </div>
          <div className="grid w-full gap-3">
            <Button disabled={isPending} type="submit">
              {isPending ? <Loader2 className="animate-spin" /> : "Sign up"}
            </Button>
            <div className="flex w-full h-6 items-center justify-center">
              <hr className="flex-1 border-muted-foreground" />
              <span className="text-muted-foreground px-3">or</span>
              <hr className="flex-1 border-muted-foreground" />
            </div>
            <Button
              onClick={handleGoogleAuth}
              disabled={isPending}
              type="button"
              variant="outline"
            >
              <Image
                src="/images/google.svg"
                alt="Google"
                width={20}
                height={20}
                className="mr-2"
              />
              Continue with Google
            </Button>
          </div>
          <div className="-mt-4 max-w-[280px] mx-auto">
            <p className="text-muted-foreground text-sm text-center ">
              By clicking continue, you agree to our Terms of Service and
              Privacy Policy.
            </p>
          </div>
        </form>
        <div className="mt-auto pt-8">
          <p className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <span className="text-lg">🔒</span>
            <span>Secure • Powered by Supabase</span>
          </p>
        </div>
      </Form>
    </div>
  );
};

export default SignupForm;
