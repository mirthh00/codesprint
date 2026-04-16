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
  console.log("TRACKING CLICK FOR:", slug);

  const headersList = headers();

  const forwarded = headersList.get("x-forwarded-for");

  const ip =
    forwarded?.split(",")[0] ||
    headersList.get("x-real-ip") ||
    "unknown";

  const device = headersList.get("user-agent") || "unknown";

  await prisma.referralClick.create({
    data: {
      slug,
      ip,
      device,
    },
  });
} catch (err) {
  console.log("CLICK ERROR:", err?.code || err);
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
