import LandingFooter from "@/components/LandingFooter";
import NavBar from "@/components/nav-bar";

export const metadata = {
  title: "Membership Page",
  description: "Membership Packages on Virstravel",
};

export default function MembershipLayout({ children }) {
  return (
    <>
      <NavBar />
      <main className="w-full min-h-screen bg-white flex items-center justify-center">
        {children}
      </main>
      <LandingFooter />
    </>
  );
}
