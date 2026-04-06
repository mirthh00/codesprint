// app/api/test-email/route.js
import { sendConfirmation } from "@/lib/email";
import { NextResponse } from "next/server";

export async function GET() {
  await sendConfirmation("mirthh00@gmail.com", "TEST123");
  return NextResponse.json({ success: true });
}