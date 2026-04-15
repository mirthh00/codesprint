import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { username, email, phone, discount } = body;

    if (!username) {
      return NextResponse.json({ error: "Username required" }, { status: 400 });
    }

    const slug = username.trim().toLowerCase().replace(/\s+/g, "");

    // Check if already exists
    const existing = await prisma.referralCode.findUnique({
      where: { slug },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Username already taken" },
        { status: 400 }
      );
    }

    // Create referral
    const referral = await prisma.referralCode.create({
      data: {
        slug,
        influencer: username,
        discount,
        active: true,
        email,
        phone,
      },
    });

    return NextResponse.json(referral);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
