"use client";

import { Button } from "./ui/button";
import { CopyIcon } from "./ui/CopyIcon";
import { DownloadIcon } from "./ui/DownloadIcon";
import { ChevronRightIcon } from "./ui/ChevronRightIcon";

const QuoteActions = () => {
  const handleDownloadPDF = async () => {
    console.log("download pdf");
  };

  return (
    <div className="btns max-w-5xl mx-auto flex items-center justify-between">
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
