"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function LeadForm({
  referralSlug = "",
  influencer = "",
  discount = 0,
}) {
  const [loading, setLoading] = useState(false);

const hasReferral = !!referralSlug;

const fullPrice = hasReferral ? 2250 : 2500;
const deposit = fullPrice;

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    const res = await fetch("/api/submit", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.paymentUrl) {
      window.location.href = data.paymentUrl;
      return;
    }

    setLoading(false);
  }

  return (
   <section className="min-h-screen bg-black py-12 sm:py-16 md:py-24 px-4 sm:px-6 relative overflow-hidden text-white">
  {/* Background image */}
  <div className="absolute inset-0 opacity-8">
    <Image
      src="/programmers-bg.jpg"
      alt="Developers background"
      fill
      className="object-cover"
    />
  </div>

  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
    className="relative z-10 max-w-6xl mx-auto bg-[#111] border border-white/10 shadow-2xl rounded-3xl sm:rounded-[2rem] overflow-hidden"
  >
    <div className="grid grid-cols-1 md:grid-cols-2">
      
      {/* LEFT SALES PANEL */}
      <div className="bg-black p-6 sm:p-8 md:p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10">
        <div>
          <p className="text-green-400 font-semibold uppercase tracking-[0.15em] sm:tracking-wider text-xs sm:text-sm mb-3">
            Secure Your Build Slot
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold leading-tight mb-6">
            Your premium business website launches in 24 hours.
          </h2>

          <p className="text-gray-400 leading-7 sm:leading-8 text-base sm:text-lg">
            Complete the project brief below and secure your build slot.
            Once your deposit is confirmed, our team immediately begins
            design, branding and development.
          </p>
        </div>

        <div className="mt-8 sm:mt-10 space-y-3 sm:space-y-4">
          {[
            "Custom premium UI/UX design",
            "Responsive full-stack website build",
            "SEO-ready structure",
            "Live progress tracking dashboard",
            "Deployment + hosting setup",
            "1 year developer support",
          ].map((item) => (
            <div
              key={item}
              className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 sm:py-4 text-gray-300 text-sm sm:text-base"
            >
              ✔ {item}
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT FORM PANEL */}
      <div className="p-6 sm:p-8 md:p-10">
        <h3 className="text-2xl sm:text-3xl font-bold mb-4">
          Start Your Website
        </h3>

        <p className="text-gray-400 leading-7 sm:leading-8 text-sm sm:text-base mb-6">
          Tell us about your business, design preferences and branding
          assets so we can build something premium and conversion-focused.
        </p>

        {hasReferral ? (
          <div className="mb-6 bg-green-500/10 border border-green-500/20 rounded-2xl p-4 sm:p-5">
            <p className="text-green-400 font-semibold text-sm sm:text-base">
              Exclusive 10% OFF from {influencer}
            </p>
            <p className="text-gray-300 mt-2 text-sm sm:text-base">
              Total package: <strong>R{fullPrice}</strong>
            </p>
          </div>
        ) : (
          <div className="mb-6 bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5">
            <p className="text-gray-300 text-sm sm:text-base">
              Total package: <strong>R{fullPrice}</strong>
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid gap-4 sm:gap-5">
          <input
            name="name"
            placeholder="Full Name"
            required
            className="w-full bg-black border border-white/10 rounded-2xl px-4 sm:px-5 py-3 sm:py-4 outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="w-full bg-black border border-white/10 rounded-2xl px-4 sm:px-5 py-3 sm:py-4 outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
          />

          <input
            name="phone"
            placeholder="Cell Number"
            required
            className="w-full bg-black border border-white/10 rounded-2xl px-4 sm:px-5 py-3 sm:py-4 outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
          />

          <textarea
            name="idea"
            placeholder="Tell us your business idea"
            required
            className="w-full bg-black border border-white/10 rounded-2xl px-4 sm:px-5 py-3 sm:py-4 h-24 sm:h-28 outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
          />

          <textarea
            name="design"
            placeholder="Describe your preferred design style and share any websites that inspire your vision"
            required
            className="w-full bg-black border border-white/10 rounded-2xl px-4 sm:px-5 py-3 sm:py-4 h-24 sm:h-28 outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
          />


          <input
            type="hidden"
            name="referralSlug"
            value={referralSlug}
          />

          <button
            className="bg-green-600 hover:bg-green-700 text-white py-3 sm:py-4 rounded-2xl text-sm sm:text-base font-bold transition shadow-xl hover:-translate-y-0.5"
            disabled={loading}
          >
            {loading
              ? "Processing payment..."
              : `Pay R${fullPrice} & Start`}
          </button>
        </form>
      </div>
    </div>
  </motion.div>
</section>
  );
}
