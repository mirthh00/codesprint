"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Hero({
  discount = 0,
  referralSlug = "",
  influencer = "",
}) {
  const fullPrice = 800 - discount;
  const deposit = 400 - discount;
  const [menuOpen, setMenuOpen] = useState(false);
  const features = [
    {
      title: "Custom Professional Design",
      text: "A premium custom layout built around your brand, audience and goals.",
    },
    {
      title: "Complete Branding Setup",
      text: "Colors, typography, logo placement and visual consistency handled professionally.",
    },
    {
      title: "Full Website Development",
      text: "Fast, responsive, secure and production-ready website engineering.",
    },
    {
      title: "1 Year Developer Support",
      text: "We remain available long after launch for fixes, help and improvements.",
    },
    {
      title: "Live Progress Tracking",
      text: "Watch your project move from concept to deployment in real time.",
    },
    {
      title: "SEO Optimized Foundation",
      text: "Structured to rank on Google and convert search traffic into customers.",
    },
  ];

  const samples = [
    {
      title: "Online Store",
      image: "/2.jpg",
      category: "E-Commerce",
    },
    {
      title: "Fitness website",
      image: "/3.jpg",
      category: "Health",
    },
    {
      title: "Booking Site",
      image: "/4.jpg",
      category: "Travel",
    },
    {
      title: "Hotel Website",
      image: "/5.jpg",
      category: "Lifestyle",
    },
  ];

  return (
    <main className="bg-black text-white">
      {/* HERO */}
      <section className="relative min-h-screen overflow-hidden pt-20">
        <div className="absolute inset-0">
          <Image
            src="/programmers-bg.jpg"
            alt="Developers coding"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/75" />
        </div>

        {/* NAV */}
     <nav className="fixed top-0 left-0 w-full z-70 bg-black/40 backdrop-blur-xl border-b border-white/10">
  <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
    <Image
      src="/logo4.png"
      alt="CodeSprint Logo"
      width={180}
      height={60}
      className="object-contain"
    />

    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
      <Link href="/influencers" className="hover:text-white transition">
        Influencers
      </Link>
      <Link href="/about" className="hover:text-white transition">
        About
      </Link>
      <Link href="/contact" className="hover:text-white transition">
        Contact
      </Link>
      <Link
        href="/begin"
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300"
      >
        Get Started
      </Link>
    </div>
     {/* MOBILE HAMBURGER */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden text-white text-2xl"
          >
            ☰
          </button>
  </div>
</nav>

 {/* MOBILE SIDE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/70 z-50"
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="fixed top-0 right-0 w-64 h-full bg-black z-50 p-6"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
            >
              <button
                onClick={() => setMenuOpen(false)}
                className="text-white text-2xl mb-8"
              >
                ✕
              </button>

              <div className="flex flex-col gap-6 text-lg">
                <Link href="/influencers">Influencers</Link>
                <Link href="/about">About</Link>
                <Link href="/contact">Contact</Link>
                <Link
                  href="/begin"
                  className="bg-green-600 px-4 py-3 rounded-xl text-center"
                >
                  Get Started
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

        {/* CENTER HERO */}
       <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 min-h-[calc(100vh-80px)] flex items-center justify-center text-center">
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="w-full"
  >
    {discount > 0 && (
      <div className="mb-4 sm:mb-6 bg-green-500/10 border border-green-500/30 rounded-2xl px-4 sm:px-5 py-3 inline-block max-w-full">
        <p className="text-green-400 font-semibold text-sm sm:text-base break-words">
          🎉 Exclusive R{discount} OFF from {influencer}
        </p>
      </div>
    )}

    <p className="text-green-400 font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-xs sm:text-sm mb-3 sm:mb-4">
      Launch Your Business Online Fast
    </p>

    <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold leading-snug sm:leading-tight mb-4 sm:mb-6 px-1">
      Your Business Website
      <span className="text-green-400"> Designed, Built & Live in 24 Hours</span>
    </h1>

    <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-7 sm:leading-9 max-w-3xl mx-auto mb-8 sm:mb-10 px-2">
      Stop losing customers to slow turnaround times.  
      CodeSprint helps you launch a premium business website in just
      24 hours so you can start attracting leads, building trust and
      making sales immediately.
    </p>

    <Link
      href={referralSlug ? `/begin?ref=${referralSlug}` : "/begin"}
      className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 sm:px-10 py-4 sm:py-5 rounded-2xl sm:rounded-3xl text-base sm:text-lg font-semibold shadow-2xl hover:shadow-green-500/20 hover:-translate-y-0.5 transition-all duration-300"
    >
      Start My Website →
    </Link>
  </motion.div>
</div>
      </section>

      {/* PRICING + SALES */}
    <section className="py-16 sm:py-20 md:py-24 bg-[#0d0d0d]">
  <div className="max-w-7xl mx-auto px-4 sm:px-6">
   
    <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-3xl mx-auto mb-10 sm:mb-16"
      >
        <p className="text-green-400 font-semibold uppercase tracking-wide text-xs sm:text-sm mb-3">
          Premium Delivery
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
          Everything your business needs to launch professionally
        </h2>
        <p className="text-gray-400 text-base sm:text-lg leading-7 sm:leading-8 px-2">
          From branding to deployment, we create a high-converting digital
          presence that helps your business build trust, attract leads and turn
          visitors into paying customers.
        </p>
      </motion.div>
    </div>

    <div className="max-w-4xl mx-auto space-y-8 sm:space-y-10">
      {/* PRICE SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="bg-black border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 text-center shadow-2xl"
      >
        <p className="text-green-400 uppercase tracking-wide text-xs sm:text-sm mb-3 font-semibold">
          Premium Website Package
        </p>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
          R2500
        </h2>

        <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-7 sm:leading-8">
          A complete, professionally designed and developed website delivered
          in 24 hours — built to position your business as credible, modern
          and ready to convert visitors into customers.
        </p>
      </motion.div>

      {/* VALUE EXPLANATION */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="text-center max-w-3xl mx-auto px-2"
      >
        <h3 className="text-2xl sm:text-3xl font-bold mb-4">
          Why businesses choose CodeSprint
        </h3>

        <p className="text-gray-400 leading-7 sm:leading-8 text-base sm:text-lg">
          You're not just paying for a website — you're investing in a complete
          online presence designed to help your business stand out, build trust
          and generate real results from day one.
        </p>
      </motion.div>

      {/* FEATURES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {features.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-6 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 shadow-lg"
          >
            <h3 className="text-base sm:text-lg font-bold text-white mb-3">
              {item.title}
            </h3>
            <p className="text-gray-400 leading-6 sm:leading-7 text-sm sm:text-base">
              {item.text}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-8 sm:mt-10">
        <Link
          href="/begin"
          className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 sm:px-10 py-3 sm:py-4 rounded-2xl sm:rounded-3xl text-sm sm:text-base font-semibold shadow-xl hover:shadow-2xl transition"
        >
          Start My Website →
        </Link>
      </div>
    </div>
  </div>
</section>

      {/* SAMPLE BUILDS */}
      <section className="py-16 sm:py-20 md:py-24 bg-black">
  <div className="max-w-7xl mx-auto px-4 sm:px-6">
    <div className="mb-10 sm:mb-12 text-center max-w-3xl mx-auto px-2">
      <p className="text-green-400 font-semibold uppercase tracking-wide text-xs sm:text-sm mb-3">
        Sample Builds
      </p>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
        Imagine your business looking this premium
      </h2>
      <p className="text-gray-400 text-base sm:text-lg leading-7 sm:leading-8">
        Whether you're a law firm, restaurant, creator, coach or online
        store, we can tailor this level of quality to your brand within 24 hours.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {samples.map((site, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ y: -6 }}
          className="bg-[#111] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-xl"
        >
          <Image
            src={site.image}
            alt={site.title}
            width={500}
            height={350}
            className="w-full h-48 sm:h-56 object-cover"
          />

          <div className="p-4 sm:p-5">
            <p className="text-xs sm:text-sm text-green-400 font-semibold">
              {site.category}
            </p>
            <h3 className="text-lg sm:text-xl font-bold mt-2">
              {site.title}
            </h3>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

      {/* FOOTER */}
     <footer className="border-t border-white/10 bg-black">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 text-center md:text-left">
    <div>
      <p className="text-base sm:text-lg font-bold">CodeSprint.co.za</p>
      <p className="text-xs sm:text-sm text-gray-500">
        Premium websites delivered in 24 hours.
      </p>
    </div>

    <div className="flex flex-wrap justify-center md:justify-end gap-4 sm:gap-6 text-xs sm:text-sm text-gray-400">
      <Link href="/about">About</Link>
      <Link href="/contact">Contact</Link>
      <Link href="/influencers">Influencers</Link>
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
    </main>
  );
}
