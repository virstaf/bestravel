import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({ message: "you got here" });
};

export const POST = async (request) => {
  console.log(request);
  const userData = await request.json();

  if (!userData.fullname || !userData.email || !userData.phone) {
    return NextResponse.json(
      { errorMessage: "All fields required" },
      { status: 400 }
    );
  }

  // show a success response
  return NextResponse.json(
    { message: "User added to VIP Waiting List Successfully" },
    { status: 201 }
  );
};
