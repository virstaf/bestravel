// components/partners/PartnerCarousel.js
"use client";
import useEmblaCarousel from "embla-carousel-react";

export default function PartnerCarousel({ partners }) {
  const [emblaRef] = useEmblaCarousel({ loop: true });

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {partners.map((partner) => (
          <div key={partner.id} className="flex-[0_0_80%] min-w-0 pl-4">
            {/* <PartnerCard partner={partner} /> */}
            <span>Partner Card</span>
          </div>
        ))}
      </div>
    </div>
  );
}
