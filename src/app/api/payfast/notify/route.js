import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { sendConfirmation } from "@/lib/email";

export async function POST(req) {
  try {
    console.log("🔥 PAYFAST NOTIFY HIT");

    const formData = await req.formData();
    const data = Object.fromEntries(formData);

    console.log("📦 FULL PAYFAST PAYLOAD:", data);

    const paymentStatus = data.payment_status;
    const paymentId = data.m_payment_id;

    console.log("💳 Payment Status:", paymentStatus);
    console.log("🆔 Payment ID:", paymentId);

    if (!paymentId) {
      console.error("❌ Missing m_payment_id");
      return new NextResponse("OK", { status: 200 });
    }

    if (!paymentStatus) {
      console.error("❌ Missing payment_status");
      return new NextResponse("OK", { status: 200 });
    }

    if (paymentStatus?.toUpperCase() === "COMPLETE") {
      console.log("✅ Payment marked as COMPLETE");

      const existingLead = await prisma.projectLead.findUnique({
        where: { id: paymentId },
      });

      console.log("🔍 Found lead:", existingLead);

      if (!existingLead) {
        console.error("❌ Lead not found for ID:", paymentId);
        return new NextResponse("OK", { status: 200 });
      }

      const lead = await prisma.projectLead.update({
        where: { id: paymentId },
        data: {
          paymentStatus: "Paid",
          projectStatus: "Build Started",
          progressPercent: 10,
        },
      });

      console.log("🎉 Lead updated successfully:", lead.id);

      await sendConfirmation(lead.email, lead.trackingCode);
      console.log("📧 Confirmation email sent to:", lead.email);
    } else {
      console.log("⚠️ Payment not COMPLETE:", paymentStatus);
    }

    return new NextResponse("OK", { status: 200 });
  } catch (error) {
    console.error("💥 PayFast notify error:", error);

    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
