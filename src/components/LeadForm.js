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

  const fullPrice = 800 - discount;
  const deposit = 400 - discount;

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
    <section className="min-h-screen bg-gradient-to-br from-white to-gray-50 py-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
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
        className="relative z-10 max-w-5xl mx-auto bg-white border border-gray-200 shadow-2xl rounded-[2rem] overflow-hidden"
      >
        <div className="grid md:grid-cols-2">
          {/* Left info panel */}
          <div className="bg-black text-white p-10 flex flex-col ">
            <div>
              <p className="text-green-400 font-semibold uppercase tracking-wider text-sm mb-3">
                Start Your Sprint
              </p>
              <h2 className="text-4xl font-bold leading-tight mb-6">
                Your website goes live in 24 hours.
              </h2>
              <p className="text-gray-300 leading-8">
                Fill in your business details, upload your branding assets, and
                secure your build slot with a deposit.
              </p>
            </div>

            <div className=" mt-10 space-y-3 text-sm text-gray-300">
              <p>✔ Custom design & branding</p>
              <p>✔ Full responsive website build</p>
              <p>✔ 1 year developer support</p>
              <p>✔ Live project tracking link</p>
            </div>
          </div>

          {/* Right form panel */}
          <div className="p-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Start Your 24-Hour Website
            </h3>

            {discount > 0 ? (
              <div className="mb-6 bg-green-50 border border-green-200 rounded-2xl p-4">
                <p className="text-green-700 font-semibold">
                  🎉 Special R{discount} discount from {influencer}
                </p>
                <p className="text-gray-700 mt-1">
                  Your total today: <strong>R{fullPrice}</strong>
                </p>
                <p className="text-gray-700">
                  Deposit required now: <strong>R{deposit}</strong>
                </p>
              </div>
            ) : (
              <div className="mb-6 bg-gray-50 border border-gray-200 rounded-2xl p-4">
                <p className="text-gray-700">
                  Total project: <strong>R800</strong>
                </p>
                <p className="text-gray-700">
                  Deposit required now: <strong>R400</strong>
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="grid gap-5">
              <input name="name" placeholder="Full Name" required className="input" />
              <input name="email" type="email" placeholder="Email" required className="input" />
              <input name="phone" placeholder="Cell Number" required className="input" />
              <textarea
                name="idea"
                placeholder="Tell us your business idea"
                required
                className="input h-28"
              />
              <textarea
                name="design"
                placeholder="Describe the design style you like"
                required
                className="input h-28"
              />
              <input name="branding" type="file" multiple className="input" />

              <input
                type="hidden"
                name="referralSlug"
                value={referralSlug}
              />

              <button
                className="bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-bold transition shadow-lg"
                disabled={loading}
              >
                {loading
                  ? "Processing payment..."
                  : `Pay R${deposit} Deposit & Submit`}
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
