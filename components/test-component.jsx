"use client";

import { testAction } from "@/actions/test-action";
import { Button } from "./ui/button";

const TestComponent = () => {
  const handleClick = async () => {
    const formData = { name: "John Doe", email: "john@example.com" };
    const response = await fetch("/api/test-endpoint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log("Response from testAction:", data.message);
  };

  return <Button onClick={handleClick}>TestComponent</Button>;
};

export default TestComponent;
