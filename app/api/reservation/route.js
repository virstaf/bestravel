import { NextResponse } from "next/server";
import { resendEmail } from "@/actions/resendEmail";

export const POST = async (req) => {
  const {
    trip_id,
    user_id,
    email,
    type,
    details,
    fullname,
    start_date,
    end_date,
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
  } catch (error) {
    console.error("Error creating reservation:", error);
    return NextResponse.json(
      { error: "Error creating reservation" },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: "Reservation created successfully" },
    { status: 201 }
  );
};
