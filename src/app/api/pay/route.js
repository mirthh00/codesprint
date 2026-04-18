import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import crypto from "crypto";

function generateSignature(data, passPhrase = null) {
  let pfOutput = "";

  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      if (data[key] !== "") {
        pfOutput += `${key}=${encodeURIComponent(data[key].toString().trim()).replace(/%20/g, "+")}&`;
      }
    }
  }

  // Remove last &
  let getString = pfOutput.slice(0, -1);

  if (passPhrase !== null) {
    getString += `&passphrase=${encodeURIComponent(passPhrase.trim()).replace(/%20/g, "+")}`;
  }

  return crypto.createHash("md5").update(getString).digest("hex");
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
  name_first: (lead.name || "").split(" ")[0],
  name_last: (lead.name || "").split(" ")[1] || "",
  email_address: lead.email,
  m_payment_id: String(lead.id),
  amount: Number(lead.depositAmount).toFixed(2),
  item_name: "CodeSprint Website Deposit",
};

   const signature = generateSignature(
  paymentData,
  process.env.PAYFAST_PASSPHRASE || null
);

const params = new URLSearchParams(paymentData);

params.append("signature", signature);

    const payfastUrl = `https://www.payfast.co.za/eng/process?${params.toString()}`;

    return NextResponse.redirect(payfastUrl);
  } catch (error) {
    console.error("PayFast error:", error);

    return NextResponse.json(
      { error: "Payment redirect failed" },
      { status: 500 }
    );
  }
}
