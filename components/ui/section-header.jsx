import Link from "next/link";
import React from "react";

const SectionHeader = ({ title, link }) => {
  return (
    <div className="flex gap-2 w-full px-4 justify-between text-xs sm:text-sm">
      <h4 className="font-semibold text-xl">{title}</h4>
      {/* <div className=""> */}
      <Link href={link} className="hover:text-blue-800">
        See more
      </Link>
      {/* </div> */}
    </div>
  );
};

export default SectionHeader;
