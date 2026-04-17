import LeadForm from "@/components/LeadForm";

export const metadata = {
  title: "Get Started",
  description:
    "Get your custom business website in just 24 hours.",
};

export default function GetStarted({ searchParams }) {
  const { ref } = await searchParams;
  let referralSlug = "";
  if(ref){
     referralSlug = ref;
  }

  return (
    <main className="min-h-screen bg-black">
      <LeadForm
        referralSlug={referralSlug}
      />
    </main>
  );
}
