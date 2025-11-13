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
import { Textarea } from "./textarea";
import { toast } from "sonner";
import axios from "axios";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { resendEmail } from "@/actions/resendEmail";
import Link from "next/link";
import { Download } from "lucide-react";
import { DownloadIcon } from "./DownloadIcon";

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
      // const { data, error } = await supabase
      //   .from("contact-form")
      //   .insert(values);
      // if (error) {
      //   toast.error(error.details || "Something went wrong...");
      //   setIsLoading(false);
      //   return { success: false, error };
      // } else {
      const { success, message } = await resendEmail(values, "contact");
      if (!success) {
        toast.error(message || "Something went wrong");
      }
      toast.success("Message sent successfully!");
      form.reset();
      setIsLoading(false);
      // }
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
    <>
      <div className="download-pdf h-full w-full bg-gray-100 rounded-lg p-6 flex flex-col justify-between">
        <div className="">
          <span className="bg-accent mb-3 flex size-12 flex-col items-center justify-center rounded-full">
            <DownloadIcon className="h-6 w-auto" />
          </span>
          <p className="mb-2 text-lg font-semibold">Travel guide</p>
          <p className="text-muted-foreground mb-3">
            Get the Latest on travel news
          </p>
        </div>
        <div className="">
          <Button type="button" asChild className="">
            <Link
              href="/docs/Virstravel_Club_Top_10_Perk_eBook.pdf"
              className="!text-white !no-underline"
              download="Virstravel_Perk_eBook"
            >
              <span>
                <Download />
              </span>
              Download Guide
            </Link>
          </Button>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          // action={resendEmail}
          className="space-y-4 p-6 bg-white rounded-2xl w-full"
        >
          <h1 className="pb-2 font-medium text-gray-700">Leave us a message</h1>
          <div className="flex flex-col sm:flex-row gap-2 justify-between">
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem className="w-full">
                  {/* <FormLabel>Full name</FormLabel> */}
                  <FormControl>
                    <Input placeholder="Full Name" {...field} />
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
                  {/* <FormLabel>Email</FormLabel> */}
                  <FormControl>
                    <Input placeholder="example@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="md:grid items-end grid-cols-[3fr_1fr] space-y-4 md:space-y-0 gap-2">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Message</FormLabel> */}
                  <FormControl>
                    <Textarea placeholder="Your message here..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <span className="text-muted-foreground text-sm">Some text</span> */}
            <Button
              variant="outline"
              type="submit"
              disabled={isLoading}
              className=""
            >
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
    </>
  );
};

export default ContactForm;
