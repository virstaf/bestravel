import React from "react";

const ChoosingHelp = () => {
  return (
    <div className="w-full">
      <section className="article">
        <h2 className="mb-2 text-primary font-semibold text-xl">
          Need Help Choosing?
        </h2>
        <p>Here's a quick guide:</p>
        <ul className=" pl-6 my-4">
          <li>
            <strong>🧳 Silver:</strong> Ideal for casual travelers or those
            planning 1–2 trips per year
          </li>
          <li>
            <strong>🌍 Gold:</strong> Perfect for families or professionals who
            travel regularly
          </li>
          <li>
            <strong>🛫 Platinum:</strong> Built for frequent flyers, luxury
            lovers, and business travelers
          </li>
        </ul>
        <p>More benefits added regularly just for your convenience.</p>
      </section>
    </div>
  );
};

export default ChoosingHelp;
