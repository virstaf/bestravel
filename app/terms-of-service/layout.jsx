import Footer from "@/components/Footer";
import NavSection from "@/components/NavSection";

export const metadata = {
  title: "Terms of Service",
  description: "Learn about our terms of service",
};

export default function TermsOfServiceLayout({ children }) {
  return (
    <>
      <NavSection />
      <main className="w-full h-full flex items-center justify-center">
        {children}
      </main>
      <Footer />
    </>
  );
}
