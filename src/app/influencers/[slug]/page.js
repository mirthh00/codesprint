"use client"
// app/influencers/[slug]/page.jsx
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function InfluencerDashboard({ params, searchParams }) {
  const { slug } = params;
  const email = searchParams?.email;

  if (!slug) return notFound();

  // ✅ 1. Check referral exists
  const referral = await prisma.referralCode.findUnique({
    where: { slug },
  });

  if (!referral || !referral.active) {
    return notFound();
  }

  // ✅ 2. If no email provided → gate access
  if (!email) {
    return <EmailGate slug={slug} />;
  }

  // OPTIONAL: verify email matches owner
  if (referral.email && referral.email !== email) {
    return <EmailGate slug={slug} error="Incorrect email" />;
  }

  // ✅ 3. Fetch real data
  const [referrals, clicksData] = await Promise.all([
    prisma.projectLead.findMany({
      where: { referralSlug: slug },
      orderBy: { createdAt: "desc" },
    }),

    prisma.referralClick.findMany({
      where: { slug },
    }),
  ]);

  const clicks = clicksData.length;
  const signups = referrals.length;
  const deposits = referrals.filter((r) => r.depositPaid).length;
  const conversionRate = clicks
    ? Math.round((signups / clicks) * 100)
    : 0;

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-gray-50 text-gray-900 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white border border-gray-200 rounded-[2rem] shadow-2xl overflow-hidden">
          
          {/* HEADER */}
          <div className="bg-black text-white p-8">
            <p className="text-green-400 uppercase tracking-[0.2em] text-sm font-semibold mb-2">
              Influencer Dashboard
            </p>
            <h1 className="text-4xl font-bold">@{slug}</h1>
          </div>

          {/* STATS */}
          <div className="p-8 space-y-8">
            <div className="grid md:grid-cols-5 gap-4">
              <StatCard label="Clicks" value={clicks} />
              <StatCard label="Signups" value={signups} />
              <StatCard label="Deposits" value={deposits} />
              <StatCard label="Payout" value={`R${deposits * 100}`} />
              <StatCard label="Conversion" value={`${conversionRate}%`} />
            </div>

            {/* REFERRALS */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Recent referrals</h2>

              {referrals.length === 0 ? (
                <p className="text-gray-500">
                  No referrals yet. Share your link.
                </p>
              ) : (
                <div className="space-y-3">
                  {referrals.map((lead) => (
                    <div
                      key={lead.id}
                      className="border border-gray-200 rounded-2xl p-4 flex justify-between"
                    >
                      <div>
                        <p className="font-semibold">{lead.name}</p>
                        <p className="text-sm text-gray-500">
                          {lead.email}
                        </p>
                      </div>
                      <p className="text-green-600 font-semibold">
                        {lead.depositPaid ? "Paid" : "Pending"}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* PAYOUT INFO */}
            <div className="bg-green-50 border border-green-200 rounded-3xl p-6">
              <p className="text-lg font-bold mb-2">Monthly payouts</p>
              <p className="text-gray-700">
                Paid at end of month. Unmet thresholds roll over.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
function StatCard({ label, value }) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-3xl p-5">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-3xl font-bold text-green-600 mt-2">{value}</p>
    </div>
  );
}
function EmailGate({ slug, error }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form
        method="GET"
        className="bg-white/5 border border-white/10 p-8 rounded-3xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4">Access your dashboard</h2>

        <p className="text-gray-400 mb-6">
          Enter your email to continue
        </p>

        {error && (
          <p className="text-red-400 mb-4 text-sm">{error}</p>
        )}

        <input
          name="email"
          type="email"
          required
          placeholder="Your email"
          className="w-full p-4 rounded-xl bg-black border border-white/10 mb-4"
        />

        <button className="w-full bg-green-600 py-3 rounded-xl font-semibold">
          Continue
        </button>
      </form>
    </div>
  );
}
