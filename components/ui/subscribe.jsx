"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormMessage, FormField } from "./form";
import axios from "axios";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

const SubscribeForm = () => {
  const onSubmit = async (values) => {
    console.log(values);
    try {
      const response = await axios.post("/api/newsletter", values);
      console.log(response);
      if (response.status === 201 || response.status === 200) {
        // alert(response.data.message);
        toast.success(response.data.message || "User has been added", {
          action: {
            label: "Okay",
            onClick: () => console.log("Okay"),
          },
        });
      }
    } catch (error) {
      toast.error(error.response.data.errorMessage || "Something went wrong");
    }
  };
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex bg-white">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <div className="flex flex-col flex-1">
              <Input
                className="rounded-none pl-4 border-none"
                placeholder="Email"
                {...field}
              />
              <FormMessage className="absolute top-2 left-12" />
            </div>
          )}
        />
        <Button className="rounded-none border-none" type="submit">
          Subscribe
        </Button>
      </form>
    </Form>
  );
};

export default SubscribeForm;
