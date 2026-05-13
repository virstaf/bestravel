"use client";

import React from "react";
import { motion } from "motion/react";
import { BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const insights = [
  "How to save money on international travel",
  "Best airports for lounge access",
  "Visa-free destinations for African travelers",
  "How to travel luxury on a budget",
  "Travel planning tips for families and professionals"
];

const TravelInsights = () => {
  return (
    <section className="w-full py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
          >
            Travel Smarter With <br /> Expert Insights
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-600 leading-relaxed"
          >
            Get practical travel tips, destination guides, airport advice, budgeting strategies, 
            visa information, and insider travel knowledge designed for modern travelers.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {insights.map((title, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="p-8 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-blue-200 hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {title}
                  </h3>
                  <div className="flex items-center text-blue-600 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
                    Read more <ArrowRight className="ml-1 w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex flex-col justify-center items-center text-center text-white"
          >
            <h3 className="text-2xl font-bold mb-4">Want more?</h3>
            <p className="text-blue-100 mb-8">Access our full library of travel guides and expert tips.</p>
            <Button variant="secondary" className="w-full h-12 rounded-xl font-bold">
              Read Travel Guides
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TravelInsights;
