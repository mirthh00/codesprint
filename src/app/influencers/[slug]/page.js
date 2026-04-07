"use client"
// app/influencers/[slug]/page.jsx
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function InfluencerDashboard({ params }) {
   const { slug } = await params;

  // Replace with your real referral model later
  const referrals = await prisma.projectLead.findMany({
    where: { referralSlug: slug },
    orderBy: { createdAt: "desc" },
  });

  if (!slug) return notFound();

  const clicks = referrals.length * 5; // placeholder until click tracking table
  const signups = referrals.length;
  const deposits = referrals.filter((r) => r.depositPaid).length;
  const conversionRate = clicks ? Math.round((signups / clicks) * 100) : 0;

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-gray-50 text-gray-900 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white border border-gray-200 rounded-[2rem] shadow-2xl overflow-hidden">
          <div className="bg-black text-white p-8">
            <p className="text-green-400 uppercase tracking-[0.2em] text-sm font-semibold mb-2">
              Influencer Dashboard
            </p>
            <h1 className="text-4xl font-bold">@{slug}</h1>
            <p className="text-gray-300 mt-3">
              Track how your audience is performing in real time.
            </p>
          </div>

          <div className="p-8 space-y-8">
            <div className="grid md:grid-cols-4 gap-4">
              <StatCard label="Estimated Clicks" value={clicks} />
              <StatCard label="Signups" value={signups} />
              <StatCard label="Deposits Paid" value={deposits} />
              <StatCard label="Pending Payout" value={`R${deposits * 100}`} />
              <StatCard label="Conversion" value={`${conversionRate}%`} />
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Recent referrals</h2>
              <div className="space-y-3">
                {referrals.length === 0 ? (
                  <p className="text-gray-500">No referrals yet. Share your link to start earning.</p>
                ) : (
                  referrals.map((lead) => (
                    <div
                      key={lead.id}
                      className="border border-gray-200 rounded-2xl p-4 flex justify-between"
                    >
                      <div>
                        <p className="font-semibold">{lead.name}</p>
                        <p className="text-sm text-gray-500">{lead.email}</p>
                      </div>
                      <p className="text-green-600 font-semibold">
                        {lead.depositPaid ? "Deposit paid" : "Pending"}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-3xl p-6">
  <p className="text-lg font-bold text-gray-900 mb-2">Monthly payouts</p>
  <p className="text-gray-700 leading-8">
    Commissions are reviewed and paid at the <strong>end of each month</strong>.
    A minimum threshold applies before payout is released. Balances below the
    threshold automatically roll into the next payout cycle.
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


// Prisma upgrade recommendation
// model ReferralClick {
//   id        String   @id @default(cuid())
//   slug      String
//   leadId    String?
//   ip        String?
//   device    String?
//   createdAt DateTime @default(now())
// }

// Upgrade the onboarding form on /influencers/page.jsx with payout contact fields:
// Add below username state:
// const [phone, setPhone] = useState("");
// const [email, setEmail] = useState("");

// Replace the form block with this upgraded version:
/*
<form onSubmit={createLink} className="space-y-5">
  <input
    value={username}
    onChange={(e) => setUsername(e.target.value)}
    placeholder="Enter username (e.g. tshego100)"
    className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-green-500"
    required
  />

  <input
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
    placeholder="Phone number for payouts (optional)"
    className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-green-500"
  />

  <input
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    placeholder="Email for payout communication"
    type="email"
    className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-green-500"
  />

  <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 text-sm text-gray-600 leading-7">
    <p className="font-semibold text-gray-900 mb-2">Payout terms</p>
    <p>
      Payouts are processed <strong>once at the end of every month</strong>.
      Minimum payout threshold applies before release. If your balance is below
      the threshold, it rolls over automatically into the next month.
    </p>
  </div>

  <button className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-semibold shadow-lg transition">
    Generate My Link
  </button>
</form>
*/

// Upgrade dashboard stats section with payout card:
/*
<StatCard label="Pending Payout" value={`R${deposits * 100}`} />
*/

// Add payout notice section below recent referrals:
/*
<div className="bg-green-50 border border-green-200 rounded-3xl p-6">
  <p className="text-lg font-bold text-gray-900 mb-2">Monthly payouts</p>
  <p className="text-gray-700 leading-8">
    Commissions are reviewed and paid at the <strong>end of each month</strong>.
    A minimum threshold applies before payout is released. Balances below the
    threshold automatically roll into the next payout cycle.
  </p>
</div>
*/
