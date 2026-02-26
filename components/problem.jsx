"use client";

import React from "react";
import {
  Landmark,
  Clock,
  Gift,
  Search,
  Plane,
  Tag,
  Layout,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProblemSection() {
  const painPoints = [
    {
      icon: <Tag className="h-6 w-6" />,
      title: "High Prices Everywhere",
      description:
        "Hidden fees, confusing pricing, and rising flight/hotel rates make planning stressful and expensive.",
    },
    {
      icon: <Search className="h-6 w-6" />,
      title: "Endless Search Fatigue",
      description:
        "Hours of tab hopping and fake discounts lead to burnout rather than savings.",
    },
    {
      icon: <Gift className="h-6 w-6" />,
      title: "Loyalty Programs That Don’t Reward You",
      description:
        "Points expire before you use them, and elite perks remain out of reach for most travelers.",
    },
    {
      icon: <Plane className="h-6 w-6" />,
      title: "Airport Stress Drains the Fun",
      description:
        "Long lines and confusing airport logistics waste the joy from your trip.",
    },
  ];

  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Headline Section - Emotion First */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#1a1a1a] tracking-tight mb-6">
            Travel Should Be{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Exciting
            </span>{" "}
            — Not Stressful and Overpriced
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Most travelers waste hours hunting for deals, deal with hidden fees,
            and still overpay — only to run into long airport queues and
            disappointing service.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Visual Scannability */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {painPoints.map((point, index) => (
              <div
                key={index}
                className="group p-6 bg-gray-50 rounded-2xl transition-all duration-300 hover:bg-white hover:shadow-xl hover:-translate-y-1"
              >
                <div className="inline-flex items-center justify-center p-3 bg-red-50 text-red-500 rounded-xl mb-4 group-hover:bg-red-500 group-hover:text-white transition-colors duration-300">
                  {point.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {point.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {point.description}
                </p>
              </div>
            ))}
          </div>

          {/* Right Column: Visual Impact */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-[2rem] opacity-50 blur-2xl group-hover:opacity-75 transition-opacity duration-500"></div>
            <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
              <Image
                src="/images/frustrated-woman.jpg"
                alt="Stressed traveler"
                layout="fill"
                objectFit="cover"
                className="group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl max-w-[200px] hidden sm:block animate-bounce-slow">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Total Fatigue
                </span>
              </div>
              <p className="text-sm font-semibold text-gray-900">
                Stop wasting time on "fake" discounts.
              </p>
            </div>
          </div>
        </div>

        {/* Bridge & CTA */}
        <div className="mt-20 text-center max-w-3xl mx-auto">
          <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-bold uppercase tracking-widest mb-6">
            There's a better way
          </div>
          <p className="text-2xl font-medium text-gray-800 mb-10 leading-relaxed">
            There is a smarter way to travel — one that gives you exclusive
            deals, stress–free planning, and{" "}
            <span className="text-blue-600">VIP perks</span> that make every
            trip feel effortless.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#benefit-section"
              className="group inline-flex items-center px-8 py-4 bg-[#1a1a1a] text-white rounded-full font-bold text-lg hover:bg-blue-600 transition-all duration-300 shadow-lg hover:shadow-blue-200"
            >
              See How It Works
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
