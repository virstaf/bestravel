import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateCustomerId = (role = "USER") => {
  const prefix = role === "ADMIN" ? "A" : "V";
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}${randomNum}`;
};

export const handleError = (error: unknown) => {
  if (error instanceof Error) {
    console.error("error handler:::", error);

    return { errorMessage: error.message };
  } else {
    return { errorMessage: "An error occurred" };
  }
};
