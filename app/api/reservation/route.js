import { NextResponse } from "next/server";
import { sendEmail } from "@/actions/sendEmail";

export const POST = async (req) => {
  const { trip_id, user_id, email, type, details, start_date, end_date } =
    await req.json();

  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const { errorMessage } = await sendEmail(
      adminEmail,
      `${type.charAt(0).toUpperCase() + type.slice(1)} Reservation`,
      `A new ${type} reservation has been submitted for trip ID: ${trip_id}. Details: ${JSON.stringify(
        details
      )}, Start Date: ${start_date}, End Date: ${end_date}, User ID: ${user_id}.`
    );

    if (errorMessage) {
      throw errorMessage;
    }

    const { userEmailErrorMessage } = await sendEmail(
      email,
      `Your ${type.charAt(0).toUpperCase() + type.slice(1)} Reservation`,
      `Your ${type} reservation has been successfully submitted for trip ID: ${trip_id}. Details: ${JSON.stringify(
        details
      )}, Start Date: ${start_date}, End Date: ${end_date}.`
    );

    if (userEmailErrorMessage) {
      throw userEmailErrorMessage;
    }

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
