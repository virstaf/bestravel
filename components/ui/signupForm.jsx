"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import axios from "axios";
import Link from "next/link";

const formSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(50),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "password must contain at least 8 characters!" })
    .max(40),
});

const SignupForm = () => {
  async function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    try {
      const response = await axios.post("/api/auth/signup", values);
      if (response.status === 201 || response.status === 200) {
        toast.success(
          response.data.message || "Message submitted successfully"
        );
      }
    } catch (error) {
      toast.error(error.response.data.errorMessage || "Something went wrong");
    }
  }
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return (
    <div className="w-full max-w-[450px] mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-8 ">
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
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="username" {...field} />
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password123" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid w-full gap-3">
            <Button type="submit">Sign up</Button>
            <div className="flex w-full h-6 items-center justify-center">
              <hr className="flex-1 border-muted-foreground" />
              <span className="text-muted-foreground px-3">or</span>
              <hr className="flex-1 border-muted-foreground" />
            </div>
            <Button type="button" variant="outline">
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
      </Form>
    </div>
  );
};

export default SignupForm;
