"use client";

import { useState } from "react";

export default function EmailGate({ slug, error }) {
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/influencer-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, email, pin }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Login failed");
        setLoading(false);
        return;
      }

      window.location.reload();
    } catch (err) {
      alert("Something went wrong");
      setLoading(false);
    }
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
          Enter your email and 6-digit PIN
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

        <button
          disabled={loading}
          className="w-full bg-green-600 py-3 rounded-xl font-semibold"
        >
          {loading ? "Verifying..." : "Access Dashboard"}
        </button>
      </form>
    </div>
  );
}
