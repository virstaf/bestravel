import React from "react";

export default function OnboardingLayout({ children }) {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="mx-auto max-w-2xl px-4 py-8">{children}</div>
    </div>
  );
}
