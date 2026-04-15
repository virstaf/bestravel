import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { resendEmail } from "@/actions/resendEmail";

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

export async function GET() {
  return NextResponse.json(
    { message: "You're here, but shouldn't" },
    { status: 405 }
  );
}

export async function POST(request) {
  if (!supabaseServiceKey) {
    console.error("Missing SUPABASE_SERVICE_KEY");
    return NextResponse.json(
      { errorMessage: "Server configuration error" },
      { status: 500 }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  try {
    const userData = await request.json();

    // Validate
    if (!userData || !userData.email) {
      return NextResponse.json(
        { errorMessage: "Email is required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from("newsletter_subscribers")
      .select("email")
      .eq("email", userData.email)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { message: "User already subscribed" },
        { status: 200 } // using 200 for 'already subscribed' so client can show proper message
      );
    }

    // Insert new subscriber
    const { error: insertError } = await supabase
      .from("newsletter_subscribers")
      .insert([{ email: userData.email }]);

    if (insertError) {
      console.error("Supabase insert error:", insertError);
      return NextResponse.json(
        { errorMessage: "Failed to add user to newsletter" },
        { status: 500 }
      );
    }

    // Send confirmation email
    await resendEmail({ email: userData.email }, "newsletter-signup");

    // show a success response
    return NextResponse.json(
      { message: "User added to newsletter successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Newsletter API error:", error);
    return NextResponse.json(
      { errorMessage: "Internal server error" },
      { status: 500 }
    );
  }
}
