import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function PaymentSuccessPage({ searchParams }) {
  const leadId = searchParams.leadId;

  let trackingCode = null;

  if (leadId) {
    const lead = await prisma.projectLead.findUnique({
      where: { id: leadId },
      select: { trackingCode: true, name: true },
    });

    trackingCode = lead?.trackingCode;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-gray-50 flex items-center justify-center px-6">
      <div className="max-w-2xl w-full bg-white border border-gray-200 rounded-[2rem] shadow-2xl p-10 text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center text-4xl">
          ✅
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Deposit received successfully
        </h1>

        <p className="text-gray-600 leading-8 mb-8">
          Your 24-hour website sprint has officially started.
          Our team is now preparing your design, branding and build workflow.
        </p>

        {trackingCode && (
          <div className="bg-green-50 border border-green-200 rounded-3xl p-6 mb-8">
            <p className="font-semibold text-gray-900 mb-3">
              Your live tracking portal is ready
            </p>

            <Link
              href={`/track/${trackingCode}`}
              className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg"
            >
              Track My Project →
            </Link>
          </div>
        )}

        <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 mb-8 text-left">
          <p className="font-semibold text-gray-900 mb-2">
            What happens next?
          </p>
          <p className="text-gray-700 leading-8">
            ✔ Design sprint starts immediately
            <br />
            ✔ Branding + UI build begins
            <br />
            ✔ Progress updates reflected live
            <br />
            ✔ Delivery target: within 24 hours
          </p>
        </div>

        <Link
          href="/"
          className="inline-block border border-gray-300 px-8 py-4 rounded-2xl font-semibold"
        >
          Back Home
        </Link>
      </div>
    </main>
  );
}