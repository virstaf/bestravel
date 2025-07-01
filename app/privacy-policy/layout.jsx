import LandingFooter from "@/components/LandingFooter";
import NavBar from "@/components/nav-bar";

export const metadata = {
  title: "Privacy Policy",
  description: "Travel made easy",
};

export default function PrivacyPolicyLayout({ children }) {
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
