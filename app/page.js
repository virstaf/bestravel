import LandingPage from "@/components/LandingPage";

export default function Home() {
  // const oldStyle = "grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]";
  return (
    <div className="grid items-center justify-items-center gap-6 min-h-screen mt-16">
      <LandingPage />
    </div>
  );
}
