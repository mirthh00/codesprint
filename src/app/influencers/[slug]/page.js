import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EmailGate from "./EmailGate";
import { motion } from "framer-motion";

export default async function InfluencerDashboard({ params, searchParams }) {
  const { slug } = await params;
  const { email, pin } = await searchParams;

  if (!slug) return notFound();

  const referral = await prisma.referralCode.findUnique({
    where: { slug },
  });

  if (!referral || !referral.active) return notFound();

  if (!email || !pin) return <EmailGate slug={slug} />;

  const emailMatch = referral.email === email;
  const pinMatch = String(referral.discount) === String(pin);

  if (!emailMatch || !pinMatch) {
    return <EmailGate slug={slug} error="Incorrect email or PIN" />;
  }

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
  const sales = referrals.length;
  const conversionRate = clicks ? Math.round((sales / clicks) * 100) : 0;

  // 💰 COMMISSION TIERS
  let rate = 100;
  let nextTier = null;

  if (sales >= 25) {
    rate = 300;
  } else if (sales >= 16) {
    rate = 200;
    nextTier = { target: 25, reward: "R300 per sale" };
  } else if (sales >= 6) {
    rate = 150;
    nextTier = { target: 16, reward: "R200 per sale" };
  } else {
    rate = 100;
    nextTier = { target: 6, reward: "R150 per sale" };
  }

  // 🎁 BONUS
  let bonus = 0;
  let nextBonus = null;

  if (sales >= 30) bonus = 3000;
  else if (sales >= 20) bonus = 1500;
  else if (sales >= 10) bonus = 500;

  if (sales < 10) nextBonus = { target: 10, reward: "+R500" };
  else if (sales < 20) nextBonus = { target: 20, reward: "+R1500" };
  else if (sales < 30) nextBonus = { target: 30, reward: "+R3000" };

  const payout = sales * rate + bonus;

  // 📊 PROGRESS
  const tierProgress = nextTier
    ? Math.min((sales / nextTier.target) * 100, 100)
    : 100;

  const bonusProgress = nextBonus
    ? Math.min((sales / nextBonus.target) * 100, 100)
    : 100;

  // 📅 MONTH END
  const now = new Date();
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const payoutDate = endOfMonth.toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "long",
  });

  return (
    <main className="min-h-screen bg-[#050505] text-white px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* HEADER */}
        <div className="bg-black border border-white/10 rounded-3xl p-8">
          <p className="text-green-400 text-sm uppercase tracking-widest">
            Influencer Dashboard
          </p>
          <h1 className="text-4xl font-bold mt-2">@{slug}</h1>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-4 gap-4">
          <StatCard label="Clicks" value={clicks} />
          <StatCard label="Sales" value={sales} />
          <StatCard label="Conversion" value={`${conversionRate}%`} />
          <StatCard label="Payout" value={`R${payout}`} highlight />
        </div>

        {/* 🔥 PERFORMANCE */}
        <div className="bg-gradient-to-br from-[#0a0a0a] to-[#111] border border-white/10 rounded-3xl p-6 space-y-4">
          <h2 className="text-2xl font-bold">Your Performance</h2>

          <p>
            You are earning{" "}
            <span className="text-green-400 font-bold">
              R{rate} per sale
            </span>
          </p>

          {nextTier && (
            <p className="text-yellow-300">
              🔥 Only {nextTier.target - sales} more sales to unlock{" "}
              {nextTier.reward}
            </p>
          )}

          {nextBonus && (
            <p className="text-blue-300">
              🎯 {nextBonus.target - sales} more sales for {nextBonus.reward}
            </p>
          )}

          {/* PROGRESS BARS */}
          <div className="space-y-3 mt-4">
            {nextTier && (
              <ProgressBar
                label={`Next Tier`}
                progress={tierProgress}
                remaining={nextTier.target - sales}
                highlight
              />
            )}

            {nextBonus && (
              <ProgressBar
                label={`Bonus`}
                progress={bonusProgress}
                remaining={nextBonus.target - sales}
              />
            )}
          </div>
        </div>

        {/* REFERRALS */}
        <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-6">
          <h2 className="text-xl font-bold mb-4">Recent referrals</h2>

          {referrals.length === 0 ? (
            <p className="text-gray-500">No referrals yet.</p>
          ) : (
            <div className="space-y-3">
              {referrals.map((lead) => (
                <div
                  key={lead.id}
                  className="bg-black border border-white/10 rounded-2xl p-4 flex justify-between"
                >
                  <div>
                    <p className="font-semibold">{lead.name}</p>
                    <p className="text-sm text-gray-500">
                      {lead.email}
                    </p>
                  </div>
                  <p className="text-green-400 font-semibold">
                    {lead.paymentStatus}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 💸 PAYOUT */}
        <div className="bg-green-500/10 border border-green-500/20 rounded-3xl p-6">
          <p className="font-bold text-green-400 text-lg">
            Payout Date: {payoutDate}
          </p>
          <p className="text-gray-400 mt-1">
            We will contact you on this day to process your payment.
          </p>
        </div>
      </div>
    </main>
  );
}

/* 🔥 COMPONENTS */

function StatCard({ label, value, highlight }) {
  return (
    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-5">
      <p className="text-gray-400 text-sm">{label}</p>
      <p
        className={`text-3xl font-bold mt-2 ${
          highlight ? "text-green-400" : "text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function ProgressBar({ label, progress, remaining, highlight }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <p>{label}</p>
        <p className="text-gray-500">{remaining} left</p>
      </div>

      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8 }}
          className={`h-full ${
            highlight ? "bg-green-500" : "bg-white"
          }`}
        />
      </div>
    </div>
  );
}
