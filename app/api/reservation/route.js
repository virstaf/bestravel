import { NextResponse } from "next/server";
import { resendEmail } from "@/actions/resendEmail";

export const POST = async (req) => {
  const {
    email,
    type,
    details,
    fullname,
  } = await req.json();

  try {
    const emailUser = await resendEmail(
      {
        fullname,
        email,
        details,
        type,
      },
      type
    );

    const emailAdmin = await resendEmail(
      {
        email: "info@virstravelclub.com",
        details,
        type,
      },
      "admin-" + type
    );

    console.log("user:::", emailUser);
    console.log("admin:::", emailAdmin);

    return NextResponse.json(
      { message: "Reservation created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating reservation:", error);
    return NextResponse.json(
      { error: "Error creating reservation" },
      { status: 500 }
    );
  }
};
