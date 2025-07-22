import Posts from "@/components/Posts";
import { Button } from "@/components/ui/button";
import { howMembersSave } from "@/lib/data";
import Link from "next/link";
import React from "react";

const BlogPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Posts />
      <>
        {/* <h1 className="text-6xl font-bold mb-8">
      <section className="text-center my-8 px-4 py-8 min-h-[450px] flex flex-col items-center justify-center">
          Unlock the World with Virstravel Club
        </h1>
        <h2 className="text-4xl font-semibold">
          The Power of a Travel Perks Membership
        </h2>
      </section>
      <section className="max-w-3xl mx-auto px-4 mb-8">
        <p className="text-gray-600 mb-4">
          If you love traveling but dread the high costs and stressful planning,
          you’re not alone. At Virstravel Club, we believe luxury travel
          shouldn’t break the bank — and that’s where our travel perks
          membership comes in.
        </p>
        <p className="text-gray-600 mb-4">
          From discounted flights to cheaper hotels, access to eSIMs, airport
          lounge passes, and even free cancellation, a Virstravel Club
          membership is designed to make travel easier, smarter, and
          significantly more affordable.
        </p>
      </section>
      <section className="max-w-7xl mx-auto px-4 mb-8">
        <h2 className="max-w-3xl mx-auto text-4xl text-primary font-semibold text-center mb-6">
          Here’s how our members are saving money while traveling better.
        </h2>
        <div className="grid gap-3">
          {howMembersSave.map((item, index) => (
            <div key={index} className="mb-8 mx-auto max-w-3xl">
              <h3 className="text-2xl font-semibold">
                {index + 1}. {item.title}
              </h3>
              <p className="text-gray-600 text-xl font-semibold my-3">
                {item.subText}
              </p>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
      <div className="w-full bg-gradient-to-br from-primary to-secondary text-white text-center py-12 px-4">
        <h2 className="text-3xl font-semibold">Join the Club Today</h2>
        <p className="max-w-3xl mx-auto text-gray-200 text-lg mt-4 mb-6">
          Ready to experience the benefits of a Virstravel Club membership? Sign
          up today and start saving on your next adventure!
        </p>
        <Button className="bg-white text-primary hover:text-primary hover:scale-105 transition-all duration-300">
          <Link href="/membership">Become a Member</Link>
        </Button>
      </div> */}
      </>
    </div>
  );
};

export default BlogPage;
