"use client";

import { Button } from "./ui/button";
import { CopyIcon } from "./ui/CopyIcon";
import { DownloadIcon } from "./ui/DownloadIcon";
import { ChevronRightIcon } from "./ui/ChevronRightIcon";
// import html2pdf from "html2pdf.js";

const QuoteActions = () => {
  const options = {
    margin: 1,
    // filename: "quote.pdf",
    // image: { type: "jpeg", quality: 0.98 },
    // html2canvas: { scale: 2 },
    // jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  const handleDownloadPDF = async () => {
    console.log("download pdf");
    // const html2pdf = await require("html2pdf.js");
    // const element = document.getElementById("full_quote");
    // // html2pdf().set(options).from(element).save();
    // //   .then((res) => console.log(res))
    // //   .catch((err) => console.error(err));
    // html2pdf(element);
  };
  return (
    <div className="btns max-w-5xl mx-auto flex items-center justify-between">
      {/* <div id="full_quoter">Print this</div> */}
      <div className="space-x-6">
        <Button variant="outline">
          Duplicate Quote
          <CopyIcon />
        </Button>
        <Button className="" onClick={handleDownloadPDF}>
          Download PDF
          <DownloadIcon />
        </Button>
      </div>
      <Button variant="outline" className="text-primary">
        Send to Client
        <ChevronRightIcon />
      </Button>
    </div>
  );
};

export default QuoteActions;
