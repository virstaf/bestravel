import Footer from "@/components/Footer";
import NavSection from "@/components/NavSection";

export const metadata = {
  title: "Privacy Policy",
  description: "Travel made easy",
};

export default function PrivacyPolicyLayout({ children }) {
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
