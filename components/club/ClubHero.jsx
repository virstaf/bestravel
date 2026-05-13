"use client";

import React from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const ClubHero = () => {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-950 pt-20">
      {/* Premium Background with subtle gradient and mesh */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 via-transparent to-transparent opacity-50" />
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/20 rounded-full blur-[120px] animate-pulse" />
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wider uppercase text-blue-400 border border-blue-400/30 rounded-full bg-blue-400/5 backdrop-blur-sm">
            Experience the future of travel
          </span>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6">
            Travel Better <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-200 to-indigo-400">
              for Less
            </span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-10 leading-relaxed">
            Unlock member-only travel deals, premium perks, airport lounge access, 
            and smarter travel planning — all in one membership.
          </p>

          <p className="max-w-3xl mx-auto text-slate-500 mb-12 text-base md:text-lg">
            Whether you travel for business, vacations, family visits, or spontaneous adventures, 
            Virstravel Club helps you save money, reduce stress, and enjoy a better travel experience every time you fly.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="w-full sm:w-auto h-14 px-8 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white border-none rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all hover:scale-105"
            >
              Get Started
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto h-14 px-8 text-lg font-semibold border-slate-700 text-slate-300 hover:bg-slate-900/50 rounded-xl transition-all"
            >
              Explore Memberships
            </Button>
          </div>
        </motion.div>

        {/* Floating elements for visual depth */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-full max-w-5xl aspect-square bg-gradient-to-t from-blue-600/20 to-transparent blur-[100px] pointer-events-none"
        />
      </div>
    </section>
  );
};

export default ClubHero;
