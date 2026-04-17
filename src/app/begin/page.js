import LeadForm from "@/components/LeadForm";

export const metadata = {
  title: "Get Started",
  description:
    "Get your custom business website in just 24 hours.",
};

export default async function GetStarted({ searchParams }) {
  const params = await searchParams; 

  const referralSlug = params?.ref || "";

  return (
    <main className="min-h-screen bg-black text-white">
      <LeadForm referralSlug={referralSlug} />
    </main>
  );
}
