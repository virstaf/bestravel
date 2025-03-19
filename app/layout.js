import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavSection from "@/components/NavSection";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Bestravel App",
  description: "Built by Uniik",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <NavSection /> */}
        {children}
        {/* <Footer /> */}
        <Toaster />
      </body>
    </html>
  );
}
