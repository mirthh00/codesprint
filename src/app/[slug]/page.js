import { prisma } from "@/lib/prisma";
import Hero from "@/components/Hero";
import { notFound } from "next/navigation";

export default async function ReferralLanding({ params }) {
  // Await params for Next.js 16 App Router
  const { slug } = await params;

  const referral = await prisma.referralCode.findUnique({
    where: { slug },
  });

  if (!referral || !referral.active) {
    notFound();
  }

  return (
    <Hero
      discount={referral.discount}
      referralSlug={referral.slug}
      influencer={referral.influencer}
    />
  );
}