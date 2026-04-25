import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ProfileProvider } from "@/contexts/profile";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Virstravel Club",
  description: "Travel made easy",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <noscript>
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "#0f172a",
              color: "#f8fafc",
              fontFamily: "system-ui, sans-serif",
              padding: "2rem",
              textAlign: "center",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="56"
              height="56"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ marginBottom: "1.5rem" }}
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <h1
              style={{
                fontSize: "1.75rem",
                fontWeight: 700,
                marginBottom: "0.75rem",
              }}
            >
              JavaScript is required
            </h1>
            <p
              style={{
                fontSize: "1rem",
                color: "#94a3b8",
                maxWidth: "480px",
                lineHeight: 1.6,
              }}
            >
              Virstravel Club requires JavaScript to run. Please enable it in
              your browser settings and reload the page.
            </p>
          </div>
        </noscript>
        <ProfileProvider>{children}</ProfileProvider>
        <Toaster />
      </body>
    </html>
  );
}
