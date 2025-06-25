import LandingFooter from "@/components/LandingFooter";
import NavBar from "@/components/nav-bar";

export const metadata = {
  title: "About Virstravel Club",
  description: "Get to know us",
};

export default function AboutpageLayout({ children }) {
  return (
    <>
      {/* <NavSection /> */}
      <NavBar />
      <main className="w-full mt-16 bg-white h-full min-h-screen">
        {children}
      </main>
      <LandingFooter />
    </>
  );
}
