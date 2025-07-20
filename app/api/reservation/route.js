import { NextResponse } from "next/server";
import { sendEmail } from "@/actions/sendEmail";
import { hotelEmailHtml } from "@/lib/htmlTemplates/hotelEmail";
import { reservationEmailHtml } from "@/lib/htmlTemplates/flightEmail";
import { transferEmailHtml } from "@/lib/htmlTemplates/transferEmail";
import { resendEmail } from "@/actions/resendEmail";
// import { flightConfirmationEmail } from "@/lib/flightHtmlTemplate";

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

  let adminHtml;
  let memberHtml;

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

  // if (type == "hotel") {
  //   // ({ adminHtml, memberHtml } = hotelEmailHtml(details));

  // }

  // if (type == "transfer") {
  //   adminHtml = transferEmailHtml(details, true);
  //   memberHtml = transferEmailHtml(details, false);
  // }

  // if (type == "flight") {
  //   adminHtml = reservationEmailHtml(details, "flight-admin");
  //   memberHtml = reservationEmailHtml(details, "flight-member");
  // }

  // try {
  //   const adminEmail = process.env.ADMIN_EMAIL || "info@virstravelclub.com";
  //   const { errorMessage } = await sendEmail(
  //     adminEmail,
  //     `${type.charAt(0).toUpperCase() + type.slice(1)} Reservation`,
  //     `A new ${type} reservation has been submitted for trip ID: ${trip_id}. Details: ${JSON.stringify(
  //       details
  //     )}, Start Date: ${start_date}, End Date: ${end_date}, User ID: ${user_id}.`,
  //     adminHtml
  //   );

  //   if (errorMessage) {
  //     throw errorMessage;
  //   }

  //   const { userEmailErrorMessage } = await sendEmail(
  //     email,
  //     `Your ${type.charAt(0).toUpperCase() + type.slice(1)} Reservation`,
  //     `Your ${type} reservation has been successfully submitted for trip ID: ${trip_id}. Details: ${JSON.stringify(
  //       details
  //     )}, Start Date: ${start_date}, End Date: ${end_date}.`,
  //     memberHtml
  //   );

  //   if (userEmailErrorMessage) {
  //     throw userEmailErrorMessage;
  //   }

  //   return NextResponse.json(
  //     { message: "Reservation created successfully" },
  //     { status: 201 }
  //   );
  // } catch (error) {
  //   console.error("Error creating reservation:", error);
  //   return NextResponse.json(
  //     { error: "Error creating reservation" },
  //     { status: 500 }
  //   );
  // }
};
