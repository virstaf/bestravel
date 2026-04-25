"use client";

import { createContext, useContext, useState } from "react";

const OnboardingContext = createContext(null);

const defaultPreferences = {
  homeCountry: "",
  preferredDestinations: [],
  travelFrequency: "3-5 trips/year",
};

export function OnboardingProvider({ children }) {
  const [preferences, setPreferences] = useState(defaultPreferences);

  const updatePreferences = (updates) =>
    setPreferences((prev) => ({ ...prev, ...updates }));

  const clearPreferences = () => setPreferences(defaultPreferences);

  return (
    <OnboardingContext.Provider
      value={{ preferences, updatePreferences, clearPreferences }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const ctx = useContext(OnboardingContext);
  if (!ctx) {
    throw new Error("useOnboarding must be used inside <OnboardingProvider>");
  }
  return ctx;
}
