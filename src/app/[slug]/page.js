import { prisma } from "@/lib/prisma";
import Hero from "@/components/Hero";
import { notFound } from "next/navigation";

export default async function ReferralLanding({ params }) {
  const referral = await prisma.referralCode.findUnique({
    where: { slug: params.slug },
  });

  if (!referral || !referral.active) return notFound();

  return (
    <Hero
      discount={referral.discount}
      referralSlug={referral.slug}
      influencer={referral.influencer}
    />
  );
}