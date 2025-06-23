import Footer from "@/components/Footer";
import NavSection from "@/components/NavSection";

export const metadata = {
  title: "Membership Page",
  description: "Membership Packages on Virstravel",
};

export default function MembershipLayout({ children }) {
  return (
    <>
      <NavSection />
      <main className="w-full min-h-screen bg-primary-500 flex items-center justify-center">
        {children}
      </main>
      <Footer />
    </>
  );
}
