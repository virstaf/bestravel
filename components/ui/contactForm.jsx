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
import { Textarea } from "./textarea";
import { toast } from "sonner";
import axios from "axios";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

const formSchema = z.object({
  fullname: z
    .string()
    .min(3, {
      message: "Name must be at least 3 characters",
    })
    .max(50),
  email: z.string().email({ message: "Invalid email address" }),
  message: z.string().min(10).max(500),
});

const ContactForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("contact-form")
        .insert(values);
      if (error) {
        toast.error(error.details || "Something went wrong...");
        setIsLoading(false);
        return { success: false, error };
      } else {
        toast.success("Message submitted successfully" || data.message);
        form.reset();
        setIsLoading(false);
      }
    } catch (error) {
      toast.error(error.response.data.errorMessage || "Something went wrong");
    }
    setIsLoading(false);
  }
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
      message: "",
    },
  });
  return (
    <div className="w-full max-w-[550px]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 p-6 bg-white rounded-2xl shadow"
        >
          <h1 className="text-sm uppercase pb-2 font-bold text-center">
            Leave us a message
          </h1>
          <div className="flex flex-col sm:flex-row gap-2 justify-between">
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea placeholder="Your message here..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full justify-end">
            {/* <span className="text-muted-foreground text-sm">Some text</span> */}
            <Button type="submit" disabled={isLoading} className="w-24">
              {isLoading ? (
                <span className="animate-spin">
                  <Loader2 />
                </span>
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
