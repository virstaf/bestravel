import LandingFooter from "@/components/LandingFooter";
import NavBar from "@/components/nav-bar";

export const metadata = {
  title: "Terms of Service",
  description: "Learn about our terms of service",
};

export default function TermsOfServiceLayout({ children }) {
  return (
    <>
      <NavBar />
      <main className="w-full h-full flex items-center justify-center">
        {children}
      </main>
      <LandingFooter />
    </>
  );
}
