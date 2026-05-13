"use client";

import React from "react";
import { motion } from "motion/react";
import { UserPlus, Sparkles, MapPin } from "lucide-react";

const steps = [
  {
    title: "Join Virstravel Club",
    description: "Choose a membership plan that fits your travel lifestyle.",
    icon: UserPlus,
    color: "bg-blue-600"
  },
  {
    title: "Unlock Member Benefits",
    description: "Access exclusive travel deals, perks, and premium travel experiences.",
    icon: Sparkles,
    color: "bg-indigo-600"
  },
  {
    title: "Plan Your Next Trip",
    description: "Use Virstravel to discover destinations, save money, and travel with more confidence.",
    icon: MapPin,
    color: "bg-violet-600"
  }
];

const HowItWorksSteps = () => {
  return (
    <section className="w-full py-24 bg-slate-950 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            How Virstravel Works
          </motion.h2>
          <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connector line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-slate-800 to-transparent -translate-y-1/2 z-0" />
          
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="flex flex-col items-center text-center relative z-10"
            >
              <div className={`w-20 h-20 rounded-3xl ${step.color} flex items-center justify-center mb-8 shadow-2xl shadow-blue-500/20 group-hover:scale-110 transition-transform ring-4 ring-slate-950`}>
                <step.icon className="w-10 h-10 text-white" />
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white text-slate-950 flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
              <p className="text-slate-400 text-lg leading-relaxed max-w-xs">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>
    </section>
  );
};

export default HowItWorksSteps;
