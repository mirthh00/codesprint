import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import crypto from "crypto";

function generateSignature(data, passphrase = "") {
  const pfOutput = Object.keys(data)
    .filter((key) => data[key] !== "")
    .sort()
    .map(
      (key) =>
        `${key}=${encodeURIComponent(data[key])
          .replace(/%20/g, "+")}`
    )
    .join("&");

  const stringToHash = passphrase
    ? `${pfOutput}&passphrase=${encodeURIComponent(passphrase)}`
    : pfOutput;

  return crypto
    .createHash("md5")
    .update(stringToHash)
    .digest("hex");
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const leadId = searchParams.get("leadId");

    if (!leadId) {
      return NextResponse.json(
        { error: "Missing leadId" },
        { status: 400 }
      );
    }

    const lead = await prisma.projectLead.findUnique({
      where: { id: leadId },
    });

    if (!lead) {
      return NextResponse.json(
        { error: "Lead not found" },
        { status: 404 }
      );
    }

    const paymentData = {
      merchant_id: process.env.PAYFAST_MERCHANT_ID,
      merchant_key: process.env.PAYFAST_MERCHANT_KEY,
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?leadId=${lead.id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/fail`,
      notify_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payfast/notify`,
      name_first: lead.name.split(" ")[0] || lead.name,
      email_address: lead.email,
      m_payment_id: lead.id,
      amount: lead.depositAmount.toFixed(2),
      item_name: "CodeSprint Website Deposit",
      item_description: `24-hour website build deposit for ${lead.name}`,
    };

    const signature = generateSignature(
      paymentData,
      process.env.PAYFAST_PASSPHRASE
    );

    const params = new URLSearchParams({
      ...paymentData,
      signature,
    });

    const payfastUrl = `https://sandbox.payfast.co.za/eng/process?${params.toString()}`;

    return NextResponse.redirect(payfastUrl);
  } catch (error) {
    console.error("PayFast error:", error);

    return NextResponse.json(
      { error: "Payment redirect failed" },
      { status: 500 }
    );
  }
}
