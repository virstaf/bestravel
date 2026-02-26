import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-primary-500/20",
  {
    variants: {
      variant: {
        default:
          "bg-primary-700 text-white shadow-sm hover:bg-primary-500 hover:shadow-md active:scale-[0.98]",
        destructive:
          "bg-error text-white shadow-sm hover:bg-error/90 active:scale-[0.98]",
        outlineDestructive:
          "border border-error text-error shadow-sm hover:bg-error hover:text-white active:scale-[0.98]",
        outline:
          "border-2 border-primary-700 bg-transparent text-primary-700 hover:bg-primary-700 hover:text-white active:scale-[0.98]",
        accent:
          "bg-accent-500 text-white shadow-sm hover:bg-accent-600 hover:shadow-md active:scale-[0.98]",
        secondary:
          "bg-primary-100 text-primary-900 shadow-sm hover:bg-primary-200 active:scale-[0.98]",
        ghost: "text-primary-700 hover:bg-primary-50 active:scale-[0.98]",
        link: "text-primary-700 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-14 px-10 py-4 text-body font-semibold tracking-tight",
        sm: "h-10 px-6 py-2.5 text-small font-medium",
        lg: "h-16 px-12 py-5 text-body-lg font-bold tracking-tight",
        icon: "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
