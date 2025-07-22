import LandingFooter from "@/components/LandingFooter";
import NavBar from "@/components/nav-bar";

export default function PostPageLayout({ children }) {
  return (
    <div className=" layout">
      <NavBar />
      <main className="min-h-screen mt-16">{children}</main>
      <LandingFooter />
    </div>
  );
}
