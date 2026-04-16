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

  const h = headers?.();

  const ip =
    h?.get?.("x-forwarded-for")?.split(",")[0] ||
    h?.get?.("x-real-ip") ||
    "unknown";

  const device = h?.get?.("user-agent") || "unknown";

  await prisma.referralClick.create({
    data: {
      slug,
      ip,
      device,
    },
  });
} catch (err) {
  console.log("CLICK ERROR:", err);
}
  

  return (
    <Hero
      discount={referral.discount}
      referralSlug={referral.slug}
      influencer={referral.influencer}
    />
  );
}
