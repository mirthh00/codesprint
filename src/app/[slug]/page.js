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

  return (
    <Hero
      discount={0}
      referralSlug={referral.slug}
      influencer={referral.influencer}
    />
  );
}
