// app/about/page.jsx
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "About Us",
  description:
    "Learn how CodeSprint builds premium websites in 24 hours for South African businesses.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-gray-50 text-gray-900">
      <section className="max-w-7xl mx-auto px-6 pt-8 pb-16 grid md:grid-cols-2 gap-14 items-center">
        <div>
          <p className="text-green-600 font-semibold uppercase tracking-wider text-sm mb-3">
            About CodeSprint
          </p>
          <h1 className="text-5xl font-bold leading-tight mb-6">
            We launch business websites in <span className="text-green-600">24 hours</span>.
          </h1>
          <p className="text-gray-600 text-lg leading-8 mb-6">
            CodeSprint is a fast-turnaround web studio focused on helping founders,
            creators, and small businesses get online quickly without sacrificing
            quality. We combine premium design, clean code, strong branding, and
            dedicated support into one streamlined sprint.
          </p>
          <p className="text-gray-600 text-lg leading-8 mb-8">
            Our promise is simple: once your deposit is secured, our team moves
            immediately into strategy, design, development, and launch—keeping you
            updated through a live progress tracking link.
          </p>

          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm">
              <p className="text-3xl font-bold text-green-600">24h</p>
              <p className="text-sm text-gray-500 mt-1">Delivery promise</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm">
              <p className="text-3xl font-bold text-green-600">1 year</p>
              <p className="text-sm text-gray-500 mt-1">Developer support</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm">
              <p className="text-3xl font-bold text-green-600">100%</p>
              <p className="text-sm text-gray-500 mt-1">Custom built</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-2xl border border-gray-200">
          <Image
            src="/programmers-team.jpg"
            alt="CodeSprint team"
            width={700}
            height={500}
            className="rounded-2xl object-cover w-full h-[420px]"
          />
        </div>
      </section>
    </main>
  );
}


