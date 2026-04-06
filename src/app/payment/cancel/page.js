import Link from "next/link";

export default function PaymentCancelPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-gray-50 flex items-center justify-center px-6">
      <div className="max-w-2xl w-full bg-white border border-gray-200 rounded-[2rem] shadow-2xl p-10 text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center text-4xl">
          ❌
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Payment was cancelled
        </h1>

        <p className="text-gray-600 leading-8 mb-8">
          No worries — your project details are still safely saved.
          You can return anytime and complete your deposit when ready.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            href="/begin"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg"
          >
            Try Again
          </Link>

          <Link
            href="/"
            className="border border-gray-300 px-8 py-4 rounded-2xl font-semibold"
          >
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}