import { NextResponse } from "next/server";
import { activateTrialManual } from "@/lib/subscription";
import { createClient } from "@/lib/supabase/server";

export async function POST(req) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data, error } = await activateTrialManual(user);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Trial API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
