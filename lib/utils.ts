import { clsx, type ClassValue } from "clsx";
import { jwtVerify, SignJWT } from "jose";
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

export const encrypt = async (payload: any) => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET));
};

export const decrypt = async (input: any) => {
  const { payload } = await jwtVerify(
    input,
    new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET),
    {
      algorithms: ["HS256"],
    }
  );

  return payload;
};

export function getDeviceType() {
  const userAgent = navigator.userAgent;
  if (/Mobile|Android|iPhone|iPad/i.test(userAgent)) {
    return "MOBILE";
  } else if (/Tablet|iPad/i.test(userAgent)) {
    return "TABLET";
  } else {
    return "WEB";
  }
}

export function getOrCreateDeviceId() {
  let deviceId = localStorage.getItem("device_id");

  if (!deviceId) {
    // Generate a unique ID
    deviceId =
      getDeviceType().toLowerCase() +
      Math.random().toString(36).substr(2, 9) +
      Date.now().toString(36);
    localStorage.setItem("device_id", deviceId);
  }

  return deviceId;
}
