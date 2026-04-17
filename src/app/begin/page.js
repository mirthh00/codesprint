import LeadForm from "@/components/LeadForm";

export const metadata = {
  title: "Get Started",
  description:
    "Get your custom business website in just 24 hours.",
};

export default function GetStarted({ searchParams }) {
  const referralSlug = await searchParams?.ref || "";

  return (
    <main className="min-h-screen bg-black">
      <LeadForm
        referralSlug={referralSlug}
      />
    </main>
  );
}
