import LeadForm from "@/components/LeadForm";

export const metadata = {
  title: "Get Started",
  description:
    "Get your custom business website in just 24 hours.",
};

export default async function GetStarted({ searchParams }) {
  const params = await searchParams; // ✅ resolve it

  const referralSlug = params?.ref || "";

  return (
    <main className="min-h-screen bg-black text-white">
      <p>ref: {params?.ref} | slug: {referralSlug}</p>

      <LeadForm referralSlug={referralSlug} />
    </main>
  );
}
