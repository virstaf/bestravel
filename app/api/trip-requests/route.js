import { NextResponse } from "next/server";
// import nodemailer from "nodemailer";

export const POST = async (request) => {
  const userData = await request.json();
  console.log(userData);
};
