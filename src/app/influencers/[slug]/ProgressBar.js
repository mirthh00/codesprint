"use client";

import { motion } from "framer-motion";

export default function ProgressBar({ label, progress, remaining, highlight }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <p>{label}</p>
        <p className="text-gray-500">{remaining} left</p>
      </div>

      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8 }}
          className={`h-full ${
            highlight ? "bg-green-500" : "bg-white"
          }`}
        />
      </div>
    </div>
  );
}
