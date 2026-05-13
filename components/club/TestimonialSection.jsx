"use client";

import React from "react";
import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Virstravel helped me save money on hotels while making my airport experience much more comfortable.",
    author: "Sarah J.",
    role: "Frequent Traveler"
  },
  {
    quote: "I used to spend hours comparing travel sites. Now I find better options much faster.",
    author: "Michael R.",
    role: "Business Consultant"
  },
  {
    quote: "The lounge access alone made my membership worth it.",
    author: "David K.",
    role: "Family Traveler"
  }
];

const TestimonialSection = () => {
  return (
    <section className="w-full py-24 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
          >
            What Our Members Say
          </motion.h2>
          <div className="flex justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-10 rounded-[2.5rem] bg-white shadow-xl shadow-slate-200/50 border border-white relative"
            >
              <div className="absolute top-8 right-8">
                <Quote className="w-10 h-10 text-slate-100" />
              </div>
              <p className="text-xl text-slate-700 italic leading-relaxed mb-8 relative z-10">
                “{t.quote}”
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600">
                  {t.author[0]}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{t.author}</h4>
                  <p className="text-sm text-slate-500">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/50 blur-[100px] -translate-y-1/2 translate-x-1/2 rounded-full" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-100/50 blur-[100px] translate-y-1/2 -translate-x-1/2 rounded-full" />
    </section>
  );
};

export default TestimonialSection;
