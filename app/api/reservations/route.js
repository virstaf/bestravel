import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import ReservationConfirmationEmail from "@/email-templates/confirm-reservation";

export async function POST(request) {
  try {
    const supabase = await createClient();
    const { type, details, tripId } = await request.json();

    // 1. Authentication
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { message: "You must be logged in to make a reservation" },
        { status: 401 }
      );
    }

    // 2. Validation
    if (!tripId) {
      return NextResponse.json(
        { message: "Trip ID is required" },
        { status: 400 }
      );
    }

    const { data: trip, error: tripError } = await supabase
      .from("trips")
      .select("start_date, end_date, title")
      .eq("id", tripId)
      .single();

    if (tripError || !trip) {
      return NextResponse.json({ message: "Trip not found" }, { status: 404 });
    }

    // 3. DB Insert
    const { error: insertError } = await supabase.from("reservations").insert({
      trip_id: tripId,
      user_id: user.id,
      type,
      details,
      start_date: trip.start_date,
      end_date: trip.end_date,
      status: "pending",
    });

    if (insertError) {
      console.error("Database insertion error:", insertError);
      return NextResponse.json(
        { message: "Failed to save reservation details" },
        { status: 500 }
      );
    }

    // 4. Send Email
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY is missing");
      return NextResponse.json(
        {
          success: true,
          warning: "Reservation saved, but email service is not configured.",
        },
        { status: 200 }
      );
    }

    const resend = new Resend(apiKey);
    const fullname = user.user_metadata.full_name || user.email.split("@")[0];
    const link = "https://virstravelclub.com/dashboard/reservations";

    const { data: emailData, error: emailError } = await resend.emails.send({
      from: "bookings@virstravelclub.com",
      to: user.email,
      subject: `Your ${type} reservation is confirmed!`,
      react: (
        <ReservationConfirmationEmail
          fullname={fullname}
          reservationLink={link}
          type={type}
        />
      ),
    });

    if (emailError) {
      console.error("Email sending error:", emailError);
      return NextResponse.json(
        {
          success: true,
          warning: "Reservation saved, but confirmation email failed to send.",
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Reservation submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Reservation API Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
