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
    <main className="min-h-screen bg-gradient-to-br from-white to-gray-50 text-gray-900">
      <section className="max-w-7xl mx-auto px-6 pt-8 pb-16">
        <div className="max-w-3xl">
          <p className="text-green-600 font-semibold uppercase tracking-wider text-sm mb-3">
            Contact Us
          </p>
          <h1 className="text-5xl font-bold leading-tight mb-6">
            Let’s build your next website sprint.
          </h1>
          <p className="text-gray-600 text-lg leading-8 mb-10">
            Reach the right team instantly. We’ve created dedicated mailboxes so
            every request moves fast and lands with the right people.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {contacts.map((item) => (
            <div
              key={item.email}
              className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow-xl transition"
            >
              <p className="text-sm uppercase tracking-wider text-green-600 font-semibold mb-2">
                {item.title}
              </p>
              <a
                href={`mailto:${item.email}`}
                className="text-2xl font-bold text-gray-900 hover:text-green-600 transition"
              >
                {item.email}
              </a>
              <p className="text-gray-600 mt-3 leading-7">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="/begin"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl text-lg font-semibold inline-block shadow-lg"
          >
            Start Your Project →
          </Link>
        </div>
      </section>
    </main>
  );
}
