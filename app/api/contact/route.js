import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const GET = async () => {
  return NextResponse.json({ message: "you got here" });
};

export const POST = async (request) => {
  const userData = await request.json();
  const { fullname, email, message } = userData;

  if (!fullname || !email || !message) {
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
  const userMailInfo = {
    from: process.env.ADMIN_EMAIL, // Sender address
    to: email, // Recipient email address
    subject: `Message submitted to Virstaf`, // Subject line
    text: `Dear ${fullname}, Your message has been received. We will get back to you shortly. \nMessage: ${message}`, // plain text body
  };

  const adminMailInfo = {
    from: process.env.ADMIN_EMAIL, // Sender address
    to: process.env.ADMIN_EMAIL, // Recipient email address
    subject: `Contact Message From ${fullname}`, // Subject line
    text: `Name: ${fullname}\nEmail: ${email}\nMessage: ${message}`, // plain text,
  };

  try {
    await transporter.sendMail(userMailInfo);
    await transporter.sendMail(adminMailInfo);
  } catch (err) {
    console.error(err);
  }

  // show a success response
  return NextResponse.json(
    { message: "User added to VIP Waiting List Successfully" },
    { status: 201 }
  );
};
