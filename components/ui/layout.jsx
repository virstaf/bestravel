import { cn } from "@/lib/utils";

export function Container({ className, children, ...props }) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[1280px] px-6 md:px-8", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function Grid({ className, children, ...props }) {
  return (
    <div
      className={cn(
        "grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function Section({
  className,
  children,
  variant = "default",
  ...props
}) {
  const paddings = {
    default: "py-16 md:py-24",
    small: "py-8 md:py-16",
    large: "py-24 md:py-32",
    none: "py-0",
  };

  return (
    <section className={cn(paddings[variant], className)} {...props}>
      {children}
    </section>
  );
}
