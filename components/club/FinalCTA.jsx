"use client";

import React from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

const FinalCTA = () => {
  return (
    <section className="w-full py-24 bg-slate-950 relative overflow-hidden">
      {/* Background visual effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.15),transparent_70%)]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 tracking-tight">
            Start Traveling <br /> Smarter Today
          </h2>
          <p className="text-xl md:text-2xl text-slate-400 mb-12 leading-relaxed">
            Join Virstravel Club and unlock better travel experiences, 
            exclusive savings, and premium perks designed for modern travelers.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button 
              size="lg" 
              className="w-full sm:w-auto h-16 px-12 text-xl font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-[0_0_40px_rgba(37,99,235,0.4)] transition-all hover:scale-105 active:scale-95"
            >
              Join Virstravel Club
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto h-16 px-12 text-xl font-bold border-slate-700 text-white hover:bg-white/5 rounded-2xl transition-all"
            >
              Learn More
            </Button>
          </div>
          
          <p className="mt-12 text-slate-500 font-medium tracking-wide uppercase text-sm">
            Smarter travel. Better experiences. More value.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
