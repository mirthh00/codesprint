import { prisma } from "@/lib/prisma";
import Hero from "@/components/Hero";
import { notFound } from "next/navigation";
import { headers } from "next/headers";

export default async function ReferralLanding({ params }) {
  const { slug } = await params;

  const referral = await prisma.referralCode.findUnique({
    where: { slug },
  });

  if (!referral || !referral.active) {
    notFound();
  }

  try {
    const headersList = headers();

    const ip =
      headersList.get("x-forwarded-for")?.split(",")[0] ||
      headersList.get("x-real-ip") ||
      null;

    const device = headersList.get("user-agent");

    if (ip) {
      await prisma.referralClick.create({
        data: {
          slug,
          ip,
          device,
        },
      });
    }
  } catch (err) {
    //  ignore duplicate constraint errors silently
    // Prisma P2002 = unique constraint violation
    if (err.code !== "P2002") {
      console.error("Click tracking failed:", err);
    }
  }

  return (
    <Hero
      discount={referral.discount}
      referralSlug={referral.slug}
      influencer={referral.influencer}
    />
  );
}
