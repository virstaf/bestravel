import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  if (!body.fullname || !body.email || !body.message) {
    return NextResponse.json(
      { errorMessage: "All fields required" },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { message: "Message added successfully" },
    { status: 201 }
  );
}
