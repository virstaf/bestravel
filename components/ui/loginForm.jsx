"use client";

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
import { googleAuthAction, loginAction } from "@/actions/users";
import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { EyeClosed } from "lucide-react";
import { Eye } from "lucide-react";
import Link from "next/link";
import { getProfileAction } from "@/actions/profiles";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "password must contain at least 8 characters!" })
    .max(50),
});

const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { profile } = await getProfileAction();
      if (profile && profile.role === "ADMIN") {
        router.replace("/admin");
      } else if (profile) {
        router.replace("/dashboard");
      }
    };
    checkUser();
  }, []);

  async function onSubmit(values) {
    startTransition(async () => {
      const { email } = values;
      const { password } = values;

      let errorMessage;
      let title;
      let description;

      const response = await loginAction(email, password);
      errorMessage = response.errorMessage;
      title = "Login successful";
      description = "Welcome back";

      if (!errorMessage) {
        toast.success(title, { description: description });
        const { profile } = await getProfileAction();
        const isAdmin = profile?.role === "ADMIN";

        if (isAdmin) {
          router.replace("/admin");
        } else {
          router.replace("/dashboard");
        }
      } else {
        toast.error("Error", { description: errorMessage });
      }
    });
  }
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleGoogleAuth = async () => {
    startTransition(async () => {
      await googleAuthAction();
    });
  };

  return (
    <div className="w-full max-w-[450px] mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-8 ">
          <div className="flex flex-col gap-1">
            <h3 className="text-2xl font-medium text-center">
              Login to your account
            </h3>
            <p className="text-muted-foreground text-center">
              Enter your details below to login
            </p>
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="example@domain.com" {...field} />
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

          <div className="flex justify-end -mt-6">
            <Link
              href="/auth/forgot-password"
              className="text-sm text-muted-foreground hover:text-primary underline"
            >
              Forgot password?
            </Link>
          </div>

          <div className="grid w-full gap-3">
            <Button type="submit" disabled={isPending}>
              {isPending ? <Loader2 className="animate-spin" /> : "Login"}
            </Button>
            <div className="flex w-full h-6 items-center justify-center">
              <hr className="flex-1 border-muted-foreground" />
              <span className="text-muted-foreground px-3">or</span>
              <hr className="flex-1 border-muted-foreground" />
            </div>
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              onClick={handleGoogleAuth}
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
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms-of-service"
                className="text-muted-foreground hover:text-primary underline"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy-policy"
                className="text-muted-foreground hover:text-primary underline"
              >
                Privacy Policy
              </Link>
              .
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

export default LoginForm;
