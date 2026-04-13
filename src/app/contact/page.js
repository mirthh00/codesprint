// app/contact/page.jsx
import Link from "next/link";

export const metadata = {
  title: "Contact Us",
  description:
    "Contact us through provided emails and we will get back to you in no time.",
};

export default function ContactPage() {
  const contacts = [
    {
      title: "New Projects",
      email: "projects@codesprint.co.za",
      desc: "For new website builds, urgent launches, and sprint bookings.",
    },
    {
      title: "Client Support",
      email: "support@codesprint.co.za",
      desc: "For active client updates, revisions, and technical help.",
    },
    {
      title: "Billing & Invoices",
      email: "billing@codesprint.co.za",
      desc: "For deposits, invoices, balance payments, and receipts.",
    },
    {
      title: "Partnerships",
      email: "partners@codesprint.co.za",
      desc: "For influencers, referral campaigns, and strategic collaborations.",
    },
  ];

  return (
   <main className="min-h-screen bg-gradient-to-br from-black via-[#0d0d0d] to-[#111] text-white">
  <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-10 sm:pb-16">
    <div className="max-w-3xl">
      <p className="text-green-400 font-semibold uppercase tracking-[0.15em] sm:tracking-wider text-xs sm:text-sm mb-3">
        Contact Us
      </p>
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
        Let’s build your next website sprint.
      </h1>
      <p className="text-gray-300 text-base sm:text-lg leading-7 sm:leading-8 mb-8 sm:mb-10">
        Reach the right team instantly. We’ve created dedicated mailboxes so
        every request moves fast and lands with the right people.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
      {contacts.map((item) => (
        <div
          key={item.email}
          className="bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-xl hover:bg-white/10 transition"
        >
          <p className="text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-wider text-green-400 font-semibold mb-2">
            {item.title}
          </p>
          <a
            href={`mailto:${item.email}`}
            className="text-lg sm:text-2xl font-bold text-white hover:text-green-400 transition break-all"
          >
            {item.email}
          </a>
          <p className="text-gray-300 mt-3 leading-6 sm:leading-7 text-sm sm:text-base">
            {item.desc}
          </p>
        </div>
      ))}
    </div>

    <div className="mt-8 sm:mt-10">
      <Link
        href="/begin"
        className="bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-sm sm:text-lg font-semibold inline-block shadow-lg"
      >
        Start Your Project →
      </Link>
    </div>
  </section>
</main>
  );
}
