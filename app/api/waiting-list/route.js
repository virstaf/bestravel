import { NextResponse } from "next/server";

export const GET = async (req) => {
  return NextResponse.json({ message: "you got here" });
};

export const POST = async (request) => {
  console.log(request);
  const userData = await request.json();

  if (!userData.name || !userData.email || !userData.message) {
    return NextResponse.json(
      { errorMessage: "All fields required" },
      { status: 301 }
    );
  }

  // show a success response
  return NextResponse.json(
    { message: "User added to VIP Waiting List Successfully" },
    { status: 201 }
  );
};
