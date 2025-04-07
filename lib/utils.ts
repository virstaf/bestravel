import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleError = (error: unknown) => {
  if (error instanceof Error) {
    console.error("error plenty:::", error);

    return { errorMessage: error.message };
  } else {
    return { errorMessage: "An error occurred" };
  }
};
