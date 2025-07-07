import { Button } from "@/components/ui/button";
import {
  coreValues,
  milestones,
  missionPoints,
  teamMembers,
  whoWeServe,
} from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const AboutPage = () => {
  return (
    <div className="w-full min-h-screen">
      <div className="w-full h-full flex flex-col">
        <section className="w-full container h-full mx-auto">
          <h1 className="text-4xl font-bold text-primary text-center my-12">
            About Virstravel Club
          </h1>
          <div className="relative h-96 bg-gray-900 rounded-lg overflow-hidden">
            <Image
              src="/images/lady_beach.jpg"
              alt="Our team"
              fill
              className="object-cover opacity-70"
            />
            <div className="absolute inset-0 flex items-center justify-center text-center px-4">
              {/* <h2 className="text-2xl font-bold text-primary/">About Us</h2> */}
              <h1 className="text-4xl font-bold text-white">
                We Believe Travel Should Be{" "}
                <span className="text-secondary">Joyful</span>, Not Stressful
              </h1>
            </div>
          </div>
        </section>

        <section className="w-full max-w-7xl mx-auto py-12 px-4">
          <h2 className="text-2xl font-bold  mb-4 text-primary">
            At Virstravel Club, we started with a simple frustration:
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            Why is planning a trip so stressful, and why do the best travel
            perks always seem out of reach?
          </p>
          <p className="text-lg text-gray-600 mb-4">
            Like many travelers, we spent countless hours chasing “deals” that
            turned out to be full price with a fancy label. We faced overpriced
            hotels, endless comparison sites, and long queues at airports. And
            when it came to perks like fast-track security, airport lounges, or
            concierge services, they were priced out of reach. We knew there had
            to be a better way.
          </p>
        </section>

        <section className="w-full max-w-7xl mx-auto my-8 px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary">
            Our Mission
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            To make travel less expensive, more enjoyable, and accessible to
            everyone, without compromising on quality or comfort.
          </p>
          <p className="text-lg text-gray-600 mb-4">
            We believe every traveler deserves:
          </p>
          <ul className="list-disc pl-6 text-lg text-gray-600 space-y-2">
            {missionPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </section>

        <section>
          <div className="grid md:grid-cols-3 gap-8 py-12 max-w-7xl mx-auto px-4">
            {coreValues.map((value) => (
              <div key={value.title} className="text-center">
                <div className="mx-auto bg-blue-100 rounded-full h-16 w-16 flex items-center justify-center mb-4">
                  <value.icon className="text-primary h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">{value.title}</h3>
                <p className="mt-2 text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="w-full max-w-7xl mx-auto my-8 px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary">
            Who We Serve
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            Virstravel Club is built for people who want value, ease, and a
            touch of VIP:
          </p>
          <ul className="list-disc pl-6 text-lg text-gray-600 space-y-2">
            {whoWeServe.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </section>

        <section className="w-full max-w-7xl mx-auto my-8 px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary">
            Why We Exist
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            Because travel isn’t just about the destination -
          </p>
          <p>Because travel isn’t just about the destination</p>
          <p>
            With Virstravel Club, you don’t travel alone.{" "}
            <span className="font-bold text-primary">You travel smarter</span>.
          </p>
          <ul className="list-disc pl-6 text-lg text-gray-600 space-y-2">
            {whoWeServe.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </section>

        <section className="w-full max-w-7xl mx-auto my-8 px-4">
          {/* <h2 className="text-2xl sm:text-3xl font-bold text-primary">
            Want to Know More?
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            Explore our{" "}
            <Link href="/membership" className="hover:text-secondary">
              Membership Plans
            </Link>{" "}
            or{" "}
            <Link href="/auth/signup" className="hover:text-secondary">
              Get Started Now
            </Link>
            . Let us help you unlock the travel experience you deserve.
          </p> */}
        </section>

        <section className="">
          {/*  <div className="columns-1 md:columns-3 gap-8 space-y-8 py-12">
            {teamMembers.map((member) => (
              <div key={member.name} className="break-inside-avoid">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={200}
                  height={200}
                  className="rounded-full mx-auto hover:scale-105 transition-transform"
                />
                <h3 className="text-center font-bold mt-4">{member.name}</h3>
                <p className="text-center text-primary">{member.role}</p>
              </div>
            ))}
          </div> */}
        </section>

        <section className="w-full max-w-7xl mx-auto px-4">
          {/* <div className="border-l-2 border-blue-200 pl-8 py-8 space-y-12">
            {milestones.map((milestone) => (
              <div key={milestone.year} className="relative">
                <div className="absolute -left-10 top-2 h-4 w-4 rounded-full bg-blue-600" />
                <h3 className="font-bold">{milestone.year}</h3>
                <p className="text-gray-600">{milestone.event}</p>
              </div>
            ))}
          </div> */}
        </section>

        <section className="w-full container mx-auto pb-8 px-4">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-8 text-center text-white my-12">
            <h2 className="text-3xl font-bold mb-4">Want to Know More?</h2>
            <p className="text-lg text-white mb-4">
              Explore our{" "}
              <Link href="/membership" className="hover:text-secondary">
                Membership Plans
              </Link>{" "}
              or{" "}
              <Link href="/auth/signup" className="hover:text-secondary">
                Get Started Now
              </Link>
              . Let us help you unlock the travel experience you deserve.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
