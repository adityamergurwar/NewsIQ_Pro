// // frontend/src/components/analyze/SentimentBadge.jsx

// import React from "react";

// export default function SentimentBadge({ sentiment }) {
//   const colors = {
//     positive: "bg-green-500 text-white",
//     neutral: "bg-gray-500 text-white",
//     negative: "bg-red-500 text-white",
//   };

//   return (
//     <span
//       className={`px-2 py-1 rounded-md text-sm font-medium ${
//         colors[sentiment] || colors.neutral
//       }`}
//     >
//       {sentiment ? sentiment.toUpperCase() : "N/A"}
//     </span>
//   );
// }


import React from "react";
import { Badge } from "@/components/ui/badge";
import { Smile, Frown, Minus } from "lucide-react";
import { motion } from "framer-motion";

export default function SentimentBadge({ sentiment, score }) {
  const sentimentConfig = {
    positive: {
      icon: Smile,
      color: "bg-emerald-100 text-emerald-800 border-emerald-300",
      gradient: "from-emerald-500 to-green-500",
      emoji: "😊"
    },
    negative: {
      icon: Frown,
      color: "bg-rose-100 text-rose-800 border-rose-300",
      gradient: "from-rose-500 to-red-500",
      emoji: "😞"
    },
    neutral: {
      icon: Minus,
      color: "bg-slate-100 text-slate-800 border-slate-300",
      gradient: "from-slate-500 to-gray-500",
      emoji: "😐"
    }
  };

  const config = sentimentConfig[sentiment] || sentimentConfig.neutral;
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="inline-block"
    >
      <Badge className={`${config.color} border px-4 py-2 text-base font-semibold`}>
        <span className="text-xl mr-2">{config.emoji}</span>
        <Icon className="w-4 h-4 mr-2" />
        {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}
        {score && (
          <span className="ml-2 opacity-75">
            ({Math.round(score * 100)}%)
          </span>
        )}
      </Badge>
    </motion.div>
  );
}