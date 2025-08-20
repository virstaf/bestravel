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
import { updatePasswordAction } from "@/actions/users";
import { useTransition, useState } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { EyeClosed, Eye } from "lucide-react";

const formSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Password must contain at least 8 characters!" })
    .max(50),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const ResetPasswordForm = () => {
  const [isPending, startTransition] = useTransition();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  async function onSubmit(values) {
    startTransition(async () => {
      const { password } = values;

      const response = await updatePasswordAction(password);

      if (!response.errorMessage) {
        setIsSubmitted(true);
        toast.success("Password updated", {
          description: "Your password has been successfully updated",
        });
      } else {
        toast.error("Error", { description: response.errorMessage });
      }
    });
  }

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  if (isSubmitted) {
    return (
      <div className="w-full max-w-[450px] mx-auto">
        <div className="space-y-8 p-8">
          <div className="flex flex-col gap-1">
            <h3 className="text-2xl font-medium text-center">
              Password updated successfully
            </h3>
            <p className="text-muted-foreground text-center">
              Your password has been updated. You can now log in with your new password.
            </p>
          </div>
          <div className="grid w-full gap-3">
            <Link href="/auth/login">
              <Button type="button" className="w-full">
                Continue to login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[450px] mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-8">
          <div className="flex flex-col gap-1">
            <h3 className="text-2xl font-medium text-center">
              Reset your password
            </h3>
            <p className="text-muted-foreground text-center">
              Enter your new password below.
            </p>
          </div>
          
          <div className="relative">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your new password"
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
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your new password"
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
            <Button type="submit" disabled={isPending}>
              {isPending ? <Loader2 className="animate-spin" /> : "Update password"}
            </Button>
            <Link
              href="/auth/login"
              className="text-sm text-muted-foreground hover:text-primary text-center underline"
            >
              Back to login
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ResetPasswordForm;
