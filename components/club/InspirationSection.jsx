"use client";

import React from "react";
import { motion } from "motion/react";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

const InspirationSection = () => {
  return (
    <section className="w-full py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-16">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
            >
              Discover Your Next Adventure
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-slate-600 leading-relaxed"
            >
              From beach escapes and city breaks to business travel and family vacations, 
              Virstravel helps you explore the world with greater value and less stress.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Button size="lg" className="h-14 px-8 rounded-xl font-bold gap-2">
              <Compass className="w-5 h-5" />
              Explore Destinations
            </Button>
          </motion.div>
        </div>

        {/* Destination grid with placeholder cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "Tropical Paradise", tag: "Beach" },
            { name: "Urban Explorer", tag: "City" },
            { name: "Mountain Retreat", tag: "Nature" },
            { name: "Business Hubs", tag: "Work" }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer shadow-lg"
            >
              <div className="absolute inset-0 bg-slate-200 group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-8 left-8">
                <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold uppercase tracking-widest mb-3 inline-block">
                  {item.tag}
                </span>
                <h3 className="text-2xl font-bold text-white">{item.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InspirationSection;
