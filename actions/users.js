"use server";

import { cookies } from "next/headers";
import { encrypt, decrypt } from "@/lib/utils";

const baseUrl = process.env.NEXT_PUBLIC_BASEURL || "https://virstravelclub.com";
const backendUrl =
  process.env.BACKEND_URL || "https://virstravelclub.com/v1/app";

export const getSession = async () => {
  const session = cookies().get("session")?.value;

  if (!session) return null;

  try {
    const decrypted = await decrypt(session);
    return JSON.parse(decrypted);
  } catch (error) {
    console.error("Failed to decrypt session:", error);
    return null;
  }
};

export const updateSession = async (newData) => {
  const session = cookies().get("session")?.value;

  if (!session) return null;

  try {
    const decrypted = await decrypt(session);
    const updated = { ...JSON.parse(decrypted), ...newData };
    const encrypted = await encrypt(JSON.stringify(updated));
    cookies().set("session", encrypted, { httpOnly: true });
    return updated;
  } catch (error) {
    console.error("Failed to update session:", error);
    return null;
  }
};

export const loginAction = async (email, password, device_id, device_type) => {
  console.log("Login action called with:", {
    email,
    password,
    device_id,
    device_type,
  });

  const response = await fetch(`${backendUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, device_id, device_type }),
  });

  console.log(response.json());

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  //  create a session
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now
  const session = await encrypt(
    JSON.stringify({
      email,
      expires,
    })
  );

  cookies().set("session", session, { expires, httpOnly: true });

  return response.json();
};

export const logoutAction = async () => {
  const response = await fetch(`${backendUrl}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
};

export const signupAction = async (email, password, fullname) => {
  const response = await fetch(`${backendUrl}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, fullname }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
};

export const resetPasswordAction = async (email) => {
  const response = await fetch(`${backendUrl}/auth/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
};

export const updatePasswordAction = async (password) => {
  const response = await fetch(`${backendUrl}/auth/update-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
};

export const googleAuthAction = async () => {};

export const deleteAccountAction = async () => {};
