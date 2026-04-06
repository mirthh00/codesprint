"use client";

import { useEffect, useState } from "react";

export default function Countdown() {
  const [time, setTime] = useState(24 * 60 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);

  return (
    <div className="bg-green-500/10 border border-green-500 rounded-2xl px-5 py-4 mb-6">
      <p className="text-green-400 font-semibold text-lg">
        Delivery window: {hours}h {minutes}m remaining
      </p>
    </div>
  );
}