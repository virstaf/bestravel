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
import { resetPasswordAction } from "@/actions/users";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

const ForgotPasswordForm = () => {
  const [isPending, startTransition] = useTransition();
  const [isSubmitted, setIsSubmitted] = useState(false);

  async function onSubmit(values) {
    startTransition(async () => {
      const { email } = values;

      const response = await resetPasswordAction(email);

      if (!response.errorMessage) {
        setIsSubmitted(true);
        toast.success("Reset link sent", {
          description: "Check your email for password reset instructions",
        });
      } else {
        toast.error("Error", { description: response.errorMessage });
      }
    });
  }

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  if (isSubmitted) {
    return (
      <div className="w-full max-w-[450px] mx-auto">
        <div className="space-y-8 p-8">
          <div className="flex flex-col gap-1">
            <h3 className="text-2xl font-medium text-center">
              Check your email
            </h3>
            <p className="text-muted-foreground text-center">
              We've sent you a password reset link. Please check your email and follow the instructions to reset your password.
            </p>
          </div>
          <div className="grid w-full gap-3">
            <Link href="/auth/login">
              <Button type="button" className="w-full">
                Back to login
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
              Forgot your password?
            </h3>
            <p className="text-muted-foreground text-center">
              Enter your email address and we'll send you a link to reset your password.
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

          <div className="grid w-full gap-3">
            <Button type="submit" disabled={isPending}>
              {isPending ? <Loader2 className="animate-spin" /> : "Send reset link"}
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

export default ForgotPasswordForm;
