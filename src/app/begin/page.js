import LeadForm from "@/components/LeadForm";

export const metadata = {
  title: "Get Started",
  description:
    "Get your custom business website in just 24 hours.",
};

export default function GetStarted() {
  return (
    <main className="min-h-screen bg-white py-16">
      <LeadForm />
    </main>
  );
}