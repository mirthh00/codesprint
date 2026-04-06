"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Countdown from "./Countdown";

export default function Hero({
  discount = 0,
  referralSlug = "",
  influencer = "",
}) {
  const fullPrice = 800 - discount;
  const deposit = 400 - discount;

  return (
    <section className="min-h-screen bg-white text-gray-900 relative overflow-hidden">
      {/* Background programmer image */}
      <div className="absolute inset-0 opacity-10">
        <Image
          src="/programmers-bg.jpg"
          alt="Developers coding"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Navigation */}
<nav className="relative z-20 border-b border-gray-200 bg-white/95 backdrop-blur-md">
  <div className="max-w-7xl mx-auto px-6 h-30 flex items-center justify-between">
    <Image
      src="/logo.png"
      alt="CodeSprint Logo"
      width={160}
      height={45}
      className="object-contain"
    />

    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
  <Link href="/influencers" className="hover:text-green-600 transition">
    Influencers
  </Link>

  <Link href="/about" className="hover:text-green-600 transition">
    About
  </Link>

  <Link href="/contact" className="hover:text-green-600 transition">
    Contact
  </Link>

  <Link
    href="/begin"
className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300"
  >
    Get Started
  </Link>
</div>
  </div>
</nav>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-4 pb-16 grid md:grid-cols-2 gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {discount > 0 && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-2xl px-4 py-3 shadow-sm">
              <p className="text-green-700 font-semibold">
                Special R{discount} OFF from {influencer}
              </p>
            </div>
          )}

          <p className="text-green-600 font-semibold mb-3 tracking-wide uppercase text-sm">
            Launch Your Business Online Fast
          </p>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            Your Custom Business Website
            <span className="text-green-600"> Live in 24 Hours</span>
          </h1>

          <p className="text-gray-600 text-lg mb-8 leading-8 max-w-xl">
            At <strong>CodeSprint.co.za</strong>, we design, brand and code your
            complete website within 24 hours.
            <br />
            Includes:
            <br />✔ Custom Professional Design
            <br />✔ Complete Branding Setup
            <br />✔ Full Website Development
            <br />✔ 1 Year Developer Support
            <br />✔ Live Progress Tracking 
            <br />✔ Seamless Deployment & Domain Setup
            <br />✔ Mid-Build & Post-Build changes
            <br />✔ Managed Hosting Setup
            <br />✔ Built SEO friendly for search engines
          </p>

          <div className="max-w-md">
  <div
    id="pricing"
    className="bg-white p-6 rounded-3xl mb-4 border border-gray-200 shadow-xl"
  >
    {discount > 0 && (
      <p className="text-gray-400 line-through text-lg">R800</p>
    )}

    <p className="text-3xl font-bold text-green-600">R{fullPrice}</p>

    <p className="text-gray-600 mt-2">
      Only <strong>R{deposit}</strong> deposit required to get started
    </p>
  </div>
 <Countdown />

  <Link
    href={referralSlug ? `/begin?ref=${referralSlug}` : "/begin"}
    className="block w-full text-center bg-green-600 hover:bg-green-700 text-white transition px-8 py-4 rounded-3xl text-lg font-semibold shadow-xl hover:shadow-2xl hover:-translate-y-0.5 duration-300"
  >
    Get Started →
  </Link>
</div>

          

         

       
        </motion.div>

        {/* Right showcase card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className="bg-white rounded-3xl p-6 shadow-2xl border border-gray-200">
            <Image
              src="/programmers-team.jpg"
              alt="CodeSprint developers"
              width={700}
              height={500}
              className="rounded-2xl object-cover w-full h-[420px]"
            />
            <div className="mt-5">
              <p className="text-sm text-gray-500">Trusted rapid delivery workflow</p>
              <h3 className="text-2xl font-bold mt-2">Professional developers building around the clock</h3>
            </div>
          </div>
        </motion.div>
      </div>
      {/* Sample website showcase */}
<div className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
  <div className="mb-12 text-center">
    <p className="text-green-600 font-semibold uppercase tracking-wide text-sm mb-3">
      Sample Builds
    </p>
    <h2 className="text-4xl font-bold text-gray-900">
      Example websites we can build for your business
    </h2>
    <p className="text-gray-600 mt-4 max-w-2xl mx-auto leading-8">
      From personal brands and service businesses to ecommerce stores and
      booking platforms, your website can be live within 24 hours.
    </p>
  </div>

  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
    {[
      {
        title: "Law Firm Website",
        image: "/2.jpg",
        category: "Professional Services",
      },
      {
        title: "Restaurant Booking Site",
        image: "/3.jpg",
        category: "Hospitality",
      },
      {
        title: "Personal Brand Portfolio",
        image: "/4.jpg",
        category: "Influencers & Coaches",
      },
      {
        title: "Online Store",
        image: "/2.jpg",
        category: "Ecommerce",
      },
    ].map((site, index) => (
      <motion.div
        key={index}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-xl hover:shadow-2xl transition"
      >
        <Image
          src={site.image}
          alt={site.title}
          width={500}
          height={350}
          className="w-full h-56 object-cover"
        />

        <div className="p-5">
          <p className="text-sm text-green-600 font-semibold">
            {site.category}
          </p>
          <h3 className="text-xl font-bold text-gray-900 mt-2">
            {site.title}
          </h3>
        </div>
      </motion.div>
    ))}
  </div>
</div>

{/* Footer */}
<footer className="relative z-10 border-t border-gray-200 bg-white/90 backdrop-blur-md">
  <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
    <div>
      <p className="text-lg font-bold text-gray-900">CodeSprint.co.za</p>
      <p className="text-sm text-gray-500">
        Fast, premium websites built in 24 hours.
      </p>
    </div>

    <div className="flex items-center gap-6 text-sm text-gray-600">
      <Link href="/about" className="hover:text-green-600 transition">
        About
      </Link>
      <Link href="/contact" className="hover:text-green-600 transition">
        Contact
      </Link>
      <Link href="/influencers" className="hover:text-green-600 transition">
        Influencers
      </Link>
    </div>
  </div>

  <div className="border-t border-gray-100">
    <div className="max-w-7xl mx-auto px-6 py-4 text-center text-sm text-gray-500">
      © {new Date().getFullYear()} CodeSprint.co.za. All rights reserved.
    </div>
  </div>
</footer>
      <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "CodeSprint",
      url: "https://codesprint.co.za",
      email: "hello@codesprint.co.za",
      areaServed: "South Africa",
    }),
  }}
/>
    </section>
    
  );
}
