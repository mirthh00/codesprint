"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function InfluencersPage() {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");

  async function createLink(e) {
    e.preventDefault();

    const slug = username.trim().toLowerCase().replace(/\s+/g, "");
    if (!slug) return;

    if (pin.length !== 6) {
      alert("PIN must be exactly 6 digits");
      return;
    }

    try {
      const res = await fetch("/api/referral", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // PIN stored under discount field
        body: JSON.stringify({ username, email, phone, discount: pin }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Something went wrong");
        return;
      }

      setGeneratedLink(`${window.location.origin}/${slug}`);
    } catch (err) {
      console.error(err);
      alert("Failed to create referral");
    }
  }

  return (
    <main className="min-h-screen bg-black text-white px-4 sm:px-6 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 items-start">
        
        {/* LEFT SALES PANEL */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-3xl sm:rounded-[2rem] p-6 sm:p-8 md:p-10 shadow-2xl"
        >
          <p className="text-green-400 uppercase tracking-[0.15em] sm:tracking-[0.2em] text-xs sm:text-sm font-semibold mb-4">
            Partner Program
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
            Earn recurring income from every business you refer.
          </h1>

          <p className="text-gray-400 leading-7 sm:leading-8 text-base sm:text-lg mb-8">
            Turn your audience into a high-value revenue stream by referring
            premium website builds through your personalized CodeSprint link.
          </p>

          <div className="space-y-4 sm:space-y-5 text-gray-300">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5">
              ✔ Your followers receive{" "}
              <strong className="text-green-400">10% OFF</strong> all website builds
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5">
              ✔ Includes{" "}
              <strong className="text-green-400">
                1 year of developer support
              </strong>{" "}
              covering bug fixes, updates, and technical assistance
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5">
              ✔ Dedicated referral landing page branded with your identity
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5">
              ✔ Real-time analytics dashboard tracking clicks, conversions & payouts
            </div>
          </div>

          <p className="mt-6 sm:mt-8 text-xs sm:text-sm text-gray-500 leading-6 sm:leading-7">
            Pro tip: Use your TikTok, Instagram, YouTube or business handle to
            instantly build trust and improve conversion rates.
          </p>
        </motion.div>

        {/* RIGHT FORM PANEL */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#111] border border-white/10 rounded-3xl sm:rounded-[2rem] shadow-2xl p-6 sm:p-8 md:p-10"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Create your referral link
          </h2>

          <p className="text-gray-400 leading-7 sm:leading-8 text-sm sm:text-base mb-8">
            Set up your referral identity once. Your dashboard and tracking link
            will be generated instantly and remain active permanently.
          </p>

          <form onSubmit={createLink} className="space-y-4 sm:space-y-5">
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username (e.g. tshego123)"
              className="w-full bg-black border border-white/10 rounded-2xl px-4 sm:px-5 py-3 sm:py-4 outline-none focus:ring-2 focus:ring-green-500 text-white text-sm sm:text-base"
              required
            />

            <input
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="6-digit dashboard PIN"
              maxLength={6}
              className="w-full bg-black border border-white/10 rounded-2xl px-4 sm:px-5 py-3 sm:py-4 outline-none focus:ring-2 focus:ring-green-500 text-white text-sm sm:text-base"
              required
            />

            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone number for payouts (optional)"
              className="w-full bg-black border border-white/10 rounded-2xl px-4 sm:px-5 py-3 sm:py-4 outline-none focus:ring-2 focus:ring-green-500 text-white text-sm sm:text-base"
            />

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email for payout communication"
              type="email"
              className="w-full bg-black border border-white/10 rounded-2xl px-4 sm:px-5 py-3 sm:py-4 outline-none focus:ring-2 focus:ring-green-500 text-white text-sm sm:text-base"
            />

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 text-xs sm:text-sm text-gray-400 leading-6 sm:leading-7">
              <p className="font-semibold text-white mb-2">Payout Terms</p>
              <p>
                Payouts are processed{" "}
                <strong className="text-green-400">
                  at the end of every month
                </strong>.
                Minimum payout thresholds apply. Unpaid balances automatically
                roll over into the next cycle.
              </p>
            </div>

            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 sm:py-4 rounded-2xl text-sm sm:text-base font-semibold shadow-xl transition-all duration-300 hover:-translate-y-0.5">
              Generate My Link
            </button>
          </form>

          {generatedLink && (
            <div className="mt-6 sm:mt-8 bg-green-500/10 border border-green-500/20 rounded-2xl p-4 sm:p-6">
              <p className="font-semibold text-green-400 mb-2 text-sm sm:text-base">
                Your referral link is ready
              </p>

              <p className="text-gray-300 break-all text-sm sm:text-base">
                {generatedLink}
              </p>

              <Link
                href={`/influencers/${username}`}
                className="inline-block mt-4 text-green-400 font-semibold hover:text-green-300 transition text-sm sm:text-base"
              >
                Open dashboard →
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
}


