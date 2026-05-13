"use client";

import React from "react";
import { motion } from "motion/react";
import { TrendingUp, Clock, Unlock, ShieldAlert } from "lucide-react";

const problems = [
  {
    title: "Flights keep getting more expensive",
    description: "Travel costs continue to rise, making vacations, business trips, and family travel harder to plan.",
    icon: TrendingUp,
    color: "text-rose-400",
    bg: "bg-rose-400/10"
  },
  {
    title: "Comparing deals takes too much time",
    description: "Most travelers spend hours jumping between apps and websites trying to find the best option.",
    icon: Clock,
    color: "text-amber-400",
    bg: "bg-amber-400/10"
  },
  {
    title: "Premium travel feels out of reach",
    description: "Airport lounges, exclusive experiences, and luxury travel perks often feel reserved for a few people.",
    icon: Unlock,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10"
  },
  {
    title: "Travel planning can feel overwhelming",
    description: "From hotels to visas, transfers, and bookings, organizing a trip can quickly become stressful.",
    icon: ShieldAlert,
    color: "text-indigo-400",
    bg: "bg-indigo-400/10"
  }
];

const ProblemSection = () => {
  return (
    <section className="w-full py-24 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
          >
            Modern Travel Has <br /> Become Frustrating
          </motion.h2>
          <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {problems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-3xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-xl hover:shadow-blue-500/5 transition-all group"
            >
              <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <item.icon className={`w-7 h-7 ${item.color}`} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
