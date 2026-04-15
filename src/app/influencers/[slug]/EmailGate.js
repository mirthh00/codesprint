"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EmailGate({ slug, error }) {
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();

    router.push(
      `/influencers/${slug}?email=${encodeURIComponent(email)}&pin=${encodeURIComponent(pin)}`
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-white/5 border border-white/10 p-8 rounded-3xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4">
          Secure Dashboard Access
        </h2>

        <p className="text-gray-400 mb-6">
          Enter email and 6-digit PIN
        </p>

        {error && (
          <p className="text-red-400 mb-4 text-sm">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 rounded-xl bg-black border border-white/10 mb-4"
          required
        />

        <input
          type="password"
          placeholder="6-digit PIN"
          value={pin}
          maxLength={6}
          onChange={(e) => setPin(e.target.value)}
          className="w-full p-4 rounded-xl bg-black border border-white/10 mb-6"
          required
        />

        <button className="w-full bg-green-600 py-3 rounded-xl font-semibold">
          Access Dashboard
        </button>
      </form>
    </div>
  );
}
