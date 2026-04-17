import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { sendConfirmation } from "@/lib/email";
import { createInvoice } from "@/lib/invoice";
import fs from "fs";
import path from "path";

export async function POST(req) {
  try {
    const data = await req.formData();

    const name = data.get("name");
    const email = data.get("email");
    const phone = data.get("phone");
    const idea = data.get("idea");
    const design = data.get("design");
    const referralSlug = data.get("referralSlug") || null;

    const trackingCode = crypto.randomUUID();

    // Dynamic pricing
  const finalPrice = referralSlug ? 2250 : 2500;
    const depositAmount = finalPrice;

    // Upload branding files to Cloudinary
 const files = data.getAll("branding");
const brandingFiles = [];

for (const file of files) {
  if (!file || typeof file === "string") continue;

  // ✅ skip empty file input
  if (!file.name || file.size === 0) continue;

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const tempPath = path.join(
    process.cwd(),
    "tmp",
    `${Date.now()}-${file.name}`
  );

  fs.mkdirSync(path.dirname(tempPath), { recursive: true });
  fs.writeFileSync(tempPath, buffer);

  const uploaded = await cloudinary.uploader.upload(tempPath, {
    folder: "codesprint-branding",
    resource_type: "auto",
  });

  brandingFiles.push(uploaded.secure_url);

  fs.unlinkSync(tempPath);
}

    // Save project
    const lead = await prisma.projectLead.create({
      data: {
        name,
        email,
        phone,
        idea,
        designPreference: design,
        brandingFiles,
        trackingCode,
        referralSlug,
        finalPrice,
        depositAmount,
      },
    });

    // Generate invoice
    const invoiceUrl = null

    await prisma.projectLead.update({
      where: { id: lead.id },
      data: { invoiceUrl },
    });

    // Send email confirmation
    //await sendConfirmation(email, trackingCode);

    return NextResponse.json({
      success: true,
      paymentUrl: `/api/pay?leadId=${lead.id}`,
    });
  } catch (error) {
    console.error("Submit error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
