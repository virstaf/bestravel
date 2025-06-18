import Footer from "@/components/Footer";
import NavSection from "@/components/NavSection";

export const metadata = {
  title: "Cookies Policy",
  description: "Learn how we use cookies on our website",
};

export default function CookiesPoliciesLayout({ children }) {
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
