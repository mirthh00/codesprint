import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const { slug, email, pin } = await req.json();

    if (!slug || !email || !pin) {
      return Response.json({ error: "Missing fields" }, { status: 400 });
    }

    const referral = await prisma.referralCode.findUnique({
      where: { slug },
    });

    if (!referral || !referral.active) {
      return Response.json({ error: "Invalid referral" }, { status: 404 });
    }

    const emailMatch = referral.email === email;
    const pinMatch = String(referral.discount) === String(pin);

    if (!emailMatch || !pinMatch) {
      return Response.json(
        { error: "Incorrect email or PIN" },
        { status: 401 }
      );
    }

    // ✅ Create session cookie
    cookies().set(`influencer_${slug}`, "true", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return Response.json({ success: true });
  } catch (err) {
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
