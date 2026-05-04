import { testAction } from "@/actions/test-action";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { formData } = await request.json();
  const response = await testAction({ formData });
  return NextResponse.json(response);
};
