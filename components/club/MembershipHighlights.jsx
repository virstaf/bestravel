"use client";

import React from "react";
import { motion } from "motion/react";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const highlights = [
  "Hotel and resort discounts",
  "Flight-related perks",
  "Lounge access",
  "Travel support",
  "Curated travel experiences",
  "Travel education and guides",
  "Exclusive member offers"
];

const MembershipHighlights = () => {
  return (
    <section className="w-full py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              A Membership That <br /> Pays for Itself
            </h2>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed">
              Many members recover the value of their membership from a single trip through 
              hotel savings, airport lounge access, and exclusive travel discounts.
            </p>

            <div className="space-y-4 mb-12">
              {highlights.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Check className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span className="text-lg text-slate-700 font-medium">{item}</span>
                </div>
              ))}
            </div>

            <Button size="lg" className="h-14 px-8 text-lg rounded-xl bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-600/20 group">
              Choose Your Membership
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Visual representation of membership value */}
            <div className="aspect-square bg-gradient-to-br from-blue-500 to-indigo-600 rounded-[4rem] p-1 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-white/10 opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="w-full h-full bg-slate-950 rounded-[3.8rem] flex flex-col items-center justify-center p-12 text-center text-white relative z-10">
                <div className="text-6xl font-bold mb-4">$0+</div>
                <div className="text-blue-400 text-xl font-medium mb-6 uppercase tracking-widest">Net Cost</div>
                <p className="text-slate-400 text-lg">
                  When you factor in savings from a single international trip or a few hotel bookings.
                </p>
                
                <div className="mt-12 grid grid-cols-2 gap-4 w-full">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="text-2xl font-bold">$250+</div>
                    <div className="text-xs text-slate-500 uppercase tracking-tighter">Avg. Hotel Saving</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="text-2xl font-bold">$100+</div>
                    <div className="text-xs text-slate-500 uppercase tracking-tighter">Lounge Value</div>
                  </div>
                </div>
              </div>
              
              {/* Decorative rings */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-blue-500/10 rounded-full animate-[spin_20s_linear_infinite]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-indigo-500/5 rounded-full animate-[spin_30s_linear_infinite_reverse]" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MembershipHighlights;
