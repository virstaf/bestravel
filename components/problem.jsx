import React from "react";
// import { FaMoneyBillWave, FaClock, FaGift, FaSearch, FaUmbrellaBeach } from "react-icons/fa";
import { Landmark, Clock, Gift, Search, Castle } from "lucide-react";

export default function ProblemSection() {
  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Headline */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary">
            Travel Should Be <span className="text-secondary">Exciting</span>
            <br />
            <span className="text-lg">
              {" "}
              Not <span className="text-red-400">Expensive & Stressful</span>.
            </span>
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Between rising costs, endless lines, and loyalty programs that
            forget you, it’s easy to feel like the system’s against you.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Column: Problem List */}
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1 text-red-400">
                <Landmark className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Hotel and flight prices keep rising
                </h3>
                <p className="mt-1 text-gray-600">
                  Hidden fees and dynamic pricing make budgeting a nightmare.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1 text-red-400">
                <Clock className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Long queues at airports drain your energy
                </h3>
                <p className="mt-1 text-gray-600">
                  Security, check-in, customs—waiting wastes precious vacation
                  time.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1 text-red-400">
                <Gift className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Loyalty programs rarely reward occasional travelers
                </h3>
                <p className="mt-1 text-gray-600">
                  Points expire before you can use them, and tiers feel
                  impossible to reach.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1 text-red-400">
                <Search className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Searching for the “best deal” takes hours
                </h3>
                <p className="mt-1 text-gray-600">
                  Endless tabs, fake discounts, and comparison fatigue.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1 text-red-400">
                <Castle className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  True luxury seems out of reach for the average budget
                </h3>
                <p className="mt-1 text-gray-600">
                  5-star stays and upgrades feel reserved for the wealthy.
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-6">
              <a
                href="#solution" // Link to your solution section
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-blue-700 transition-colors duration-200"
              >
                There’s a Better Way →
              </a>
            </div>
          </div>

          {/* Right Column: Visual */}
          <div className="relative">
            {/* Replace with your image/illustration */}
            <div className="bg-gray-200 rounded-xl overflow-hidden aspect-video flex items-center justify-center">
              <span className="text-gray-500">
                (Image: Stressed traveler at airport)
              </span>
            </div>
            {/* Optional: Animated decorative element */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-red-100 rounded-full opacity-20 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
