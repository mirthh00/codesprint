// app/influencers/page.jsx
"use client";

import { useState } from "react";
import Link from "next/link";

export default function InfluencersPage() {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
const [email, setEmail] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");

  function createLink(e) {
    e.preventDefault();
    const slug = username.trim().toLowerCase().replace(/\s+/g, "");
    if (!slug) return;
    setGeneratedLink(`${window.location.origin}/${slug}`);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-gray-50 text-gray-900 px-6 py-10">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-start">
        {/* Info panel */}
        <div className="bg-black text-white rounded-[2rem] p-8 shadow-2xl">
          <p className="text-green-400 uppercase tracking-[0.2em] text-sm font-semibold mb-3">
            Influencer Program
          </p>
          <h1 className="text-4xl font-bold mb-6">
            Earn with every website signup you refer.
          </h1>
          <div className="space-y-4 text-gray-300 leading-8">
            <p>✔ Every follower gets <strong>R100 OFF</strong> with your personal link</p>
            <p>✔ Your audience lands on a personalized CodeSprint page</p>
            <p>✔ Track clicks, signups, deposits, and conversions</p>
            <p>✔ Dedicated dashboard at <strong>/influencers/yourname</strong></p>
            <p>✔ Great for creators, founders, marketers, and business pages</p>
          </div>
          <p className="mt-8 text-sm text-gray-400">
            Best practice: use your TikTok, Instagram, or YouTube handle so it’s easy for followers to trust.
          </p>
        </div>

        {/* Create link card */}
        <div className="bg-white border border-gray-200 rounded-[2rem] shadow-2xl p-8">
          <h2 className="text-3xl font-bold mb-4">Create your referral link</h2>
          <p className="text-gray-600 leading-8 mb-6">
            Enter your username once and instantly generate your CodeSprint referral page.
            Share it in your bio, stories, videos, and WhatsApp status.
          </p>

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

          {generatedLink && (
            <div className="mt-6 bg-green-50 border border-green-200 rounded-2xl p-5">
              <p className="font-semibold text-green-700 mb-2">Your referral link is ready</p>
              <p className="text-gray-700 break-all">{generatedLink}</p>
              <Link
                href={`/influencers/${username}`}
                className="inline-block mt-4 text-green-600 font-semibold"
              >
                Open dashboard →
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}


