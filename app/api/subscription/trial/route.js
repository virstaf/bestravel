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

    const result = await activateTrialManual(user);

    if (result.error) {
      throw result.error;
    }

    return NextResponse.json({ success: true, data: result.data });
  } catch (error) {
    console.error("[API:trial] Error:", error);
    return NextResponse.json(
      {
        error: "Failed to activate trial",
        details: error.message,
      },
      { status: 500 },
    );
  }
}
