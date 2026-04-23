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
import { EyeClosed, Eye } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  title: z.enum(["Mr", "Ms", "Mrs"], { required_error: "Title is required" }),
  firstName: z
    .string()
    .min(2, {
      message: "First name must be at least 2 characters",
    })
    .max(40),
  lastName: z
    .string()
    .min(2, {
      message: "Last name must be at least 2 characters",
    })
    .max(40),
  phone: z.string().min(5, { message: "Phone number is required" }),
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

const SignupForm = ({ onSuccess, redirect = true }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (redirect) {
      const fetchUser = async () => {
        const userObject = await getUser();

        if (userObject) {
          router.replace("/dashboard");
        }
      };
      fetchUser();
    }
  }, [redirect]);

  async function onSubmit(values) {
    const { password } = values;
    const { confirmPassword } = values;
    if (password !== confirmPassword) {
      toast.error("Error", { description: "Passwords do not match" });
      return;
    }

    startTransition(async () => {
      const { email, title, firstName, lastName, phone } = values;
      let errorMessage;
      let titleMessage;
      let description;

      const response = await signupAction(
        email,
        password,
        title,
        firstName,
        lastName,
        phone,
      );
      errorMessage = response.errorMessage;
      titleMessage = "Check your email! 📧";
      description =
        "We've sent you a confirmation link. Please check your email and click the link to verify your account, then you can continue with onboarding.";

      if (!errorMessage) {
        toast.success(titleMessage, {
          description: description,
          duration: 8000,
        });

        if (onSuccess) {
          onSuccess();
        }

        // No redirect needed for standard flow as it just shows success message
        router.replace("/auth/login");
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
      title: undefined,
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  return (
    <div className="w-full max-w-[450px] mx-auto mt-15">
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
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-1/3">
                  <FormLabel>Title</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Title" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Mr">Mr</SelectItem>
                      <SelectItem value="Ms">Ms</SelectItem>
                      <SelectItem value="Mrs">Mrs</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
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
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="+1234567890" {...field} />
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
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-0 top-[23px] h-9 w-9 text-muted-foreground hover:bg-transparent"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeClosed /> : <Eye />}
            </Button>
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
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-0 top-[23px] h-9 w-9 text-muted-foreground hover:bg-transparent"
              aria-label={
                showConfirmPassword ? "Hide password" : "Show password"
              }
            >
              {showConfirmPassword ? <EyeClosed /> : <Eye />}
            </Button>
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
