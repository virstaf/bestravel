import Link from "next/link";
import React from "react";

const TravelSmarter = () => {
  return (
    <section className="article">
      <h2 className="mb-2 text-primary font-semibold text-xl">
        Travel Smarter. Travel Protected.
      </h2>
      <p className="text-gray-600 mb-4">
        All memberships come with secure checkout, private dashboards, and our
        100% satisfaction promise. Flights are{" "}
        <Link
          className="hover:text-primary hover:underline"
          target="_blank"
          href="https://www.caa.co.uk/atol-protection/"
        >
          ATOL
        </Link>{" "}
        protected.
      </p>
    </section>
  );
};

export default TravelSmarter;
