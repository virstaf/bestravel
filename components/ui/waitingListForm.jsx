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

const formSchema = z.object({
  fullname: z
    .string()
    .min(3, {
      message: "Name must be at least 3 characters",
    })
    .max(50),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z
    .string()
    .min(8, { message: "Phone number must be at least 8 characters" })
    .max(20, { message: "Phone number must be at most 20 characters" })
    .regex(/^\+?[0-9\s\-()]+$/, {
      message: "Invalid phone number format",
    }),
});

const WaitingListForm = () => {
  function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
      phone: "",
    },
  });
  return (
    <div className="w-full max-w-[450px] mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <h1 className="text-sm uppercase font-bold text-center">
            Join VIP Waiting Form
          </h1>
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input placeholder="First Last" {...field} />
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
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="phone number here..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid w-full justify-end">
            {/* <span className="text-muted-foreground text-sm">Some text</span> */}
            <Button type="submit">Join Now</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default WaitingListForm;
