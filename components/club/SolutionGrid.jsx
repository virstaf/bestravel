"use client";

import React from "react";
import { motion } from "motion/react";
import { 
  Hotel, 
  Plane, 
  Headphones, 
  Compass, 
  Map, 
  Layers 
} from "lucide-react";

const benefits = [
  {
    title: "Save More on Every Trip",
    description: "Access discounted hotel rates, exclusive travel offers, and member-only pricing designed to help you spend less while traveling more.",
    icon: Hotel
  },
  {
    title: "Enjoy Premium Airport Lounge Access",
    description: "Relax before your flight with access to comfortable airport lounges around the world featuring Wi-Fi, refreshments, charging stations, and quiet spaces.",
    icon: Plane
  },
  {
    title: "Get Personalized Travel Support",
    description: "Need help planning a trip? Our travel support team helps you compare options, organize your travel, and find better experiences faster.",
    icon: Headphones
  },
  {
    title: "Travel With More Flexibility",
    description: "Whether you’re planning months ahead or booking last-minute, Virstravel gives you tools and perks that make travel easier and more convenient.",
    icon: Compass
  },
  {
    title: "Discover Better Travel Experiences",
    description: "Explore curated destinations, travel inspiration, guides, and experiences designed to help you get more from every journey.",
    icon: Map
  },
  {
    title: "Everything in One Membership",
    description: "No need to juggle multiple travel services. Virstravel brings travel perks, savings, and support together in one platform.",
    icon: Layers
  }
];

const SolutionGrid = () => {
  return (
    <section className="w-full py-24 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide uppercase text-blue-600 bg-blue-100 rounded-full"
          >
            The Solution
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-8"
          >
            Virstravel Helps You <br /> Travel Smarter
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-600 leading-relaxed"
          >
            Virstravel Club combines travel savings, premium perks, and personalized travel support 
            into one modern membership designed for today’s traveler.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="p-10 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center mb-8 shadow-lg shadow-blue-600/20">
                <benefit.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 leading-tight">{benefit.title}</h3>
              <p className="text-slate-600 text-lg leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionGrid;
