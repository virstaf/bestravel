import Footer from "@/components/Footer";
import NavBar from "@/components/nav-bar";
import NavSection from "@/components/NavSection";

export const metadata = {
  title: "Virstravel Club",
  description: "Your Travel Buddy",
};

export default function HomepageLayout({ children }) {
  return (
    <>
      {/* <NavSection /> */}
      <NavBar />
      <main className="w-full mt-16 bg-white h-full min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}
