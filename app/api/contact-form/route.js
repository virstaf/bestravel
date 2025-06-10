import { createClient } from "@supabase/supabase-js";
// import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// const supabase = createClient();

export const POST = async (req, res) => {
  if (req.method !== "POST") {
    // return res.status(405).json({ message: "Method not allowed" });
    return new Response(JSON.stringify({ message: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    // const { fullname, email, message } = req.body;
    const { fullname, email, message } = await req.json();

    if (!fullname || !email || !message) {
      return NextResponse.json({
        success: false,
        message: "All fields are required",
      });
    }
    console.log(fullname, email, message);

    // 1. Save to Supabase
    // const { data: supabaseData, error: supabaseError } = await supabase
    //   .from("contact-form")
    //   .insert([formData]);

    // if (supabaseError) {
    //   throw supabaseError;
    // }

    // 2. Send to HubSpot
    const hubspotResponse = await fetch(
      `https://api.hubapi.com/crm/v3/objects/contacts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.HUBSPOT_API}`,
        },
        body: JSON.stringify({
          properties: {
            email,
            fullname,
            message,
          },
        }),
      }
    );

    if (!hubspotResponse.ok) {
      const errorData = await hubspotResponse.json();
      console.error("HubSpot error:", errorData);
      throw new Error("Failed to submit to HubSpot");
    }

    return NextResponse.json(
      { success: true, message: "Form submitted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Form submission error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while submitting the form",
        error: error.message,
      },
      { status: 500 }
    );
  }
};
