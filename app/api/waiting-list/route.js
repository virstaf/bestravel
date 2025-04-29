import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const GET = async () => {
  return NextResponse.json({ message: "you got here" });
};

export const POST = async (request) => {
  const userData = await request.json();
  const { fullname, email, phone } = userData;

  if (!fullname || !email || !phone) {
    return NextResponse.json(
      { errorMessage: "All fields required" },
      { status: 400 }
    );
  }

  // create a transporter object using SMTP transport
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.ADMIN_EMAIL, // generated ethereal user
      pass: process.env.EMAIL_PASS, // generated ethereal password
    },
  });

  // send mail with defined transport object
  const mailInfo = {
    from: process.env.ADMIN_EMAIL, // Sender address
    to: email, // Recipient email address
    subject: `Congrats from Virtaf!`, // Subject line
    text: `Dear ${fullname}, you have been added to Virstravel Perks Club.`, // plain text body
  };

  try {
    await transporter.sendMail(mailInfo);
  } catch (err) {
    console.error(err);
  }

  // show a success response
  return NextResponse.json(
    { message: "User added to VIP Waiting List Successfully" },
    { status: 201 }
  );
};
