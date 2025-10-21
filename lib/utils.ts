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

export const getThisWeekCount = (dates : []) => {
  const today = new Date();
  const startOfWeek = new Date(today);
  const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
  
  // Calculate start of week (Monday)
  const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
  startOfWeek.setDate(diff);
  startOfWeek.setHours(0, 0, 0, 0);
  
  // End of week is start of next week
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 7);
  
  const thisWeekCount = dates.filter(dateString => {
    const date = new Date(dateString);
    return date >= startOfWeek && date < endOfWeek;
  }).length;
  
  return thisWeekCount;
};
