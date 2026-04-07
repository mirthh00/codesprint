import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { sendConfirmation } from "@/lib/email";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const paymentStatus = formData.get("payment_status");
    const paymentId = formData.get("m_payment_id");

    if (paymentStatus === "COMPLETE") {

      const lead = await prisma.projectLead.update({
  where: { id: paymentId },
  data: {
    paymentStatus: "Paid",
    projectStatus: "Build Started",
    progressPercent: 10,
  },
});

      // ✅ send email only after confirmed payment
      await sendConfirmation(lead.email, lead.trackingCode);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PayFast notify error:", error);

    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}
