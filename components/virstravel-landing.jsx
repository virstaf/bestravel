import CtaBanner from "./CTA-Banner";

export default function VirstravelLandingPage() {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-teal-400 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Virstravel Perks Club
        </h1>
        <p className="text-xl mb-6">
          Unlock VIP Travel Benefits & Save Big on Every Trip!
        </p>
        <p className="text-lg mb-4">
          💥 Up to 50% OFF Membership + £500 in Hotel Credits
        </p>
        <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
          Join Now & Claim Your Perks
        </button>
      </section>

      {/* Why Join Section */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-10">Why Choose Virstravel?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            "Up to 50% Off Hotels & Resorts",
            "Exclusive Flight & Vacation Packages",
            "VIP Airport Lounge Access",
            "Cruise & Car Rental Savings",
            "24/7 Travel Concierge Support",
          ].map((perk, i) => (
            <div key={i} className="bg-gray-100 p-6 rounded-2xl shadow">
              <p className="font-medium">{perk}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-10">How Virstravel Works</h2>
        <div className="flex flex-col md:flex-row gap-8 justify-center">
          {[
            "1. Sign Up Free – Quick and easy registration",
            "2. Unlock Deals – Instantly access travel perks",
            "3. Travel Better – Enjoy luxury at unbeatable prices",
          ].map((step, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow max-w-sm">
              <p className="font-medium">{step}</p>
            </div>
          ))}
        </div>
        <button className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition">
          Become a Member Now
        </button>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-10">What Our Members Say</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            ["Jessica M.", "I saved over £400 on my Bali trip!"],
            ["David R.", "The VIP lounge made my trip feel first-class."],
            ["Mark L.", "Unbelievable support and real savings."],
          ].map(([name, quote], i) => (
            <div key={i} className="bg-gray-100 p-6 rounded-2xl shadow">
              <p className="italic mb-2">“{quote}”</p>
              <p className="font-bold">– {name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      {/* <section className="bg-blue-600 text-white py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Save on Your Next Getaway?
        </h2>
        <button className="mt-4 bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
          Join Now – Unlock Your Perks
        </button>
      </section> */}
      <CtaBanner />
    </div>
  );
}
