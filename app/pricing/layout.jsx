import LandingFooter from "@/components/LandingFooter";
import NavBar from "@/components/nav-bar";

export const metadata = {
  title: "Pricing Page",
  description: "Pricing Packages on Virstravel",
};

export default function PricingLayout({ children }) {
  return (
    <>
      <NavBar />
      <main className="w-full min-h-screen mt-16 bg-white">{children}</main>
      <LandingFooter />
    </>
  );
}
