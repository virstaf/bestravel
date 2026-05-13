"use client";

import React from "react";
import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";

const trustPoints = [
  "Exclusive hotel discounts",
  "Flight savings and travel perks",
  "Airport lounge access",
  "Personalized travel support",
  "Flexible membership plans"
];

const TrustBar = () => {
  return (
    <div className="w-full bg-slate-950 border-y border-slate-900 py-8 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8">
          <p className="text-slate-500 font-medium text-sm tracking-[0.2em] uppercase">
            Trusted by modern travelers looking for smarter ways to explore the world
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
          {trustPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5 text-blue-500" />
              <span className="text-slate-300 font-medium">{point}</span>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-full bg-blue-500/5 blur-[80px] pointer-events-none" />
    </div>
  );
};

export default TrustBar;
