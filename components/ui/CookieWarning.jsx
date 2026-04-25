"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, X, Cookie } from "lucide-react";

function checkCookiesEnabled() {
  try {
    // navigator.cookieEnabled is a fast first pass
    if (typeof navigator !== "undefined" && !navigator.cookieEnabled) {
      return false;
    }
    // Write/read test is more reliable (catches extensions that lie about the above)
    const key = "__cookie_test__";
    document.cookie = `${key}=1; SameSite=Strict; path=/`;
    const enabled = document.cookie.indexOf(key) !== -1;
    // Clean up immediately
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    return enabled;
  } catch {
    return false;
  }
}

// Per-browser instructions for enabling cookies
const BROWSER_GUIDES = {
  chrome: {
    name: "Chrome",
    steps: [
      'Click the three-dot menu (⋮) → "Settings"',
      '"Privacy and security" → "Cookies and other site data"',
      'Select "Allow all cookies" or add this site to the "Sites that can always use cookies" list',
    ],
  },
  firefox: {
    name: "Firefox",
    steps: [
      'Click the menu (☰) → "Settings"',
      '"Privacy & Security" → under "Cookies and Site Data"',
      'Select "Standard" or add an exception for this site',
    ],
  },
  safari: {
    name: "Safari",
    steps: [
      '"Safari" menu → "Settings" → "Privacy"',
      'Uncheck "Block all cookies"',
      "Reload this page",
    ],
  },
  edge: {
    name: "Edge",
    steps: [
      'Click the three-dot menu (…) → "Settings"',
      '"Cookies and site permissions" → "Cookies and site data"',
      'Turn on "Allow sites to save and read cookie data"',
    ],
  },
  other: {
    name: "your browser",
    steps: [
      "Open your browser settings",
      "Find the Privacy or Security section",
      "Enable cookies for this site and reload the page",
    ],
  },
};

function detectBrowser() {
  if (typeof navigator === "undefined") return "other";
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes("edg/")) return "edge";
  if (ua.includes("chrome") && !ua.includes("edg")) return "chrome";
  if (ua.includes("firefox")) return "firefox";
  if (ua.includes("safari") && !ua.includes("chrome")) return "safari";
  return "other";
}

export default function CookieWarning() {
  const [cookiesBlocked, setCookiesBlocked] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [showSteps, setShowSteps] = useState(false);
  const browser = detectBrowser();
  const guide = BROWSER_GUIDES[browser];

  useEffect(() => {
    // Only run after hydration
    if (!checkCookiesEnabled()) {
      setCookiesBlocked(true);
    }
  }, []);

  if (!cookiesBlocked || dismissed) return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="fixed top-0 inset-x-0 z-50 flex flex-col gap-0 shadow-lg animate-in slide-in-from-top-2 duration-300"
    >
      {/* Main bar */}
      <div className="flex items-start gap-3 bg-amber-50 border-b border-amber-200 px-4 py-3 text-amber-900">
        <AlertTriangle
          className="mt-0.5 shrink-0 text-amber-500"
          size={18}
          aria-hidden="true"
        />

        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold leading-snug">
            Cookies are disabled in your browser
          </p>
          <p className="text-xs text-amber-700 mt-0.5 leading-relaxed">
            Virstravel Club uses cookies to keep you signed in. Without them,
            login won't work.{" "}
            <button
              onClick={() => setShowSteps((s) => !s)}
              className="underline underline-offset-2 font-medium hover:text-amber-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded"
            >
              {showSteps ? "Hide instructions" : `How to fix in ${guide.name}`}
            </button>
          </p>
        </div>

        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss cookie warning"
          className="shrink-0 rounded-md p-1 text-amber-600 hover:text-amber-900 hover:bg-amber-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
        >
          <X size={16} />
        </button>
      </div>

      {/* Expandable step-by-step */}
      {showSteps && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-3">
          <p className="text-xs font-semibold text-amber-800 mb-2 uppercase tracking-wide">
            Steps for {guide.name}
          </p>
          <ol className="space-y-1">
            {guide.steps.map((step, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-xs text-amber-800"
              >
                <span className="shrink-0 flex items-center justify-center w-4 h-4 rounded-full bg-amber-200 text-amber-800 font-bold text-[10px] mt-0.5">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
          <p className="text-xs text-amber-600 mt-3">
            After enabling cookies,{" "}
            <button
              onClick={() => window.location.reload()}
              className="underline underline-offset-2 font-medium hover:text-amber-900 transition-colors"
            >
              reload this page
            </button>{" "}
            to continue.
          </p>
        </div>
      )}
    </div>
  );
}
