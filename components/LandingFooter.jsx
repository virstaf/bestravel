import React from "react";

const LandingFooter = () => {
  return (
    <footer className="w-full">
      <div className="w-full py-8 bg-slate-900 text-(--muted)">
        <div className="container flex flex-wrap justify-between items-center mx-auto px-4 md:px-8 lg:px-12">
          <div>
            <span>Terms of Service</span>
          </div>
          <p className="">
            Virstaf Co. Ltd &copy; {new Date().getFullYear()} All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
