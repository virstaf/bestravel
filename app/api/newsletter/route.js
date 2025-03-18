import { NextResponse } from "next/server";

const newsletterSubscribers = [];

export async function GET() {
  return NextResponse.json(
    { message: "You're here, but shouldn't" },
    { status: 405 }
  );
}

export async function POST(request) {
  const userData = await request.json();
  //   Validate
  if (!userData) {
    return NextResponse.json(
      { errorMessage: "All fields required" },
      { status: 400 }
    );
  }
  //   Add user data to database or CRM
  const userExists = newsletterSubscribers.find(
    (item) => item.email === userData.email
  );
  if (userExists) {
    return NextResponse.json(
      { errorMessage: "User already exist" },
      { status: 400 }
    );
  }
  newsletterSubscribers.push(userData);
  console.log(newsletterSubscribers);

  // show a success response
  return NextResponse.json(
    { message: "User added to newsletter successfully" },
    { status: 201 }
  );
}
