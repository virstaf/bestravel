// components/TripRequestForm.js
"use client";

import { useState } from "react";

export default function TripRequestForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    // ... other fields
  });

  const handleSubmit = async () => {
    const res = await fetch("/api/trip-requests", {
      method: "POST",
      body: JSON.stringify(formData),
    });
    // Handle response
  };

  return (
    <div className="space-y-4">
      {step === 1 && <DestinationStep {...formData} />}
      {step === 2 && <DatesStep {...formData} />}
      {/* More steps */}
      <Button onClick={() => (step < 5 ? setStep(step + 1) : handleSubmit())}>
        {step < 5 ? "Next" : "Submit Request"}
      </Button>
    </div>
  );
}
