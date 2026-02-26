"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Container, Grid, Section } from "@/components/ui/layout";
import { cn } from "@/lib/utils";
import {
  Info,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Calendar,
  MapPin,
  Search,
  Copy,
  Check,
  ChevronRight,
  Menu,
} from "lucide-react";

export default function DesignSystemPage() {
  const [activeSection, setActiveSection] = useState("colors");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sections = [
    { id: "colors", label: "Color Architecture" },
    { id: "typography", label: "Typography System" },
    { id: "components", label: "Component System" },
    { id: "motion", label: "Motion & Micro-UX" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 },
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: "smooth",
      });
    }
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Nav Trigger */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <Button
          size="icon"
          className="h-14 w-14 rounded-full shadow-lg bg-primary-700 text-white"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Menu />
        </Button>
      </div>

      <div className="flex">
        {/* Sticky Sidebar Navigation */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-72 bg-gray-50/80 backdrop-blur-xl border-r border-gray-100 transition-transform duration-300 transform lg:translate-x-0 lg:static lg:h-screen lg:top-16 lg:sticky",
            isSidebarOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="p-10 space-y-10">
            <div className="space-y-4">
              <p className="text-micro font-bold text-gray-400 uppercase tracking-[0.2em]">
                Design System
              </p>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollTo(section.id)}
                    className={cn(
                      "group flex items-center justify-between w-full px-4 py-3 text-small font-semibold rounded-xl transition-all",
                      activeSection === section.id
                        ? "bg-white shadow-sm text-primary-700 border border-gray-100"
                        : "text-gray-500 hover:bg-gray-100/50 hover:text-dark-900",
                    )}
                  >
                    {section.label}
                    <ChevronRight
                      className={cn(
                        "h-4 w-4 transition-transform duration-300",
                        activeSection === section.id
                          ? "translate-x-0 opacity-100 text-primary-500"
                          : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100",
                      )}
                    />
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6 rounded-2xl bg-primary-900 text-white space-y-4 shadow-xl shadow-primary-900/10">
              <div className="space-y-1">
                <p className="text-small font-bold">Virstravel v1.2</p>
                <p className="text-micro opacity-60 leading-relaxed font-medium">
                  Refined component metrics for the strategist traveler.
                </p>
              </div>
              <Badge className="bg-white/10 hover:bg-white/20 text-white border-0 py-1 px-3 text-micro">
                STABLE RELEASE
              </Badge>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          <div className="pt-24 pb-48">
            <Container>
              <header className="mb-24 space-y-8">
                <div className="flex items-center gap-4">
                  <Badge
                    variant="outline"
                    className="text-primary-700 border-primary-100 bg-primary-100/50 px-3 py-1"
                  >
                    SYSTEM V1.2
                  </Badge>
                  <span className="text-micro text-gray-400 font-bold tracking-widest">
                    POLISHED: FEB 26, 2026
                  </span>
                </div>
                <h1 className="text-h1 text-dark-900 tracking-tight !leading-[1.1]">
                  Component Ethics <br />& Design Language
                </h1>
                <p className="text-body-lg text-gray-500 max-w-2xl leading-relaxed">
                  Precision in every pixel. This modular system ensures every
                  touchpoint communicates high-level control and premium
                  competence.
                </p>
              </header>

              {/* Sections */}
              <div className="space-y-32">
                {/* 1. Colors */}
                <section id="colors" className="scroll-mt-32">
                  <div className="flex items-baseline justify-between border-b border-gray-100 pb-10 mb-16">
                    <h2 className="text-h2 text-dark-900">Color Palette</h2>
                    <p className="text-small font-bold text-gray-300 tracking-[0.2em]">
                      01 / 04
                    </p>
                  </div>

                  <div className="space-y-20">
                    <div>
                      <div className="mb-10">
                        <h3 className="text-h4 text-dark-900 font-bold mb-2">
                          Primary Architecture
                        </h3>
                        <p className="text-body text-gray-500">
                          The absolute foundation of trust and authority.
                        </p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                        <ColorChip
                          color="bg-primary-900"
                          label="Primary 900"
                          hex="#052F4D"
                          text="text-white"
                          usage="Dark UI Elements"
                        />
                        <ColorChip
                          color="bg-primary-700"
                          label="Primary 700"
                          hex="#084168"
                          text="text-white"
                          usage="Primary Brand Blue"
                        />
                        <ColorChip
                          color="bg-primary-500"
                          hex="#0D5C8F"
                          text="text-white"
                          label="Primary 500"
                          usage="Secondary Actions"
                        />
                        <ColorChip
                          color="bg-primary-100 shadow-inner"
                          label="Primary 100"
                          hex="#E6F2F8"
                          text="text-primary-900"
                          usage="Surface Backgrounds"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="mb-10">
                        <h3 className="text-h4 text-dark-900 font-bold mb-2">
                          Accent Energy
                        </h3>
                        <p className="text-body text-gray-500">
                          Conversion drivers and dynamic highlights.
                        </p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        <ColorChip
                          color="bg-accent-600"
                          label="Accent 600"
                          hex="#E57E14"
                          text="text-white"
                          usage="Interactive States"
                        />
                        <ColorChip
                          color="bg-accent-500"
                          label="Accent 500"
                          hex="#FE8F16"
                          text="text-white"
                          usage="Primary CTAs"
                        />
                        <ColorChip
                          color="bg-accent-100 shadow-inner"
                          label="Accent 100"
                          hex="#FFF3E6"
                          text="text-accent-600"
                          usage="Contrast Surfaces"
                        />
                      </div>
                    </div>
                  </div>
                </section>

                {/* 2. Typography */}
                <section id="typography" className="scroll-mt-32">
                  <div className="flex items-baseline justify-between border-b border-gray-100 pb-10 mb-16">
                    <h2 className="text-h2 text-dark-900">Typography Scale</h2>
                    <p className="text-small font-bold text-gray-300 tracking-[0.2em]">
                      02 / 04
                    </p>
                  </div>

                  <div className="grid lg:grid-cols-[1fr_360px] gap-20">
                    <div className="space-y-16">
                      <TypeRow
                        label="Display H1"
                        className="text-h1 !leading-tight"
                      >
                        Experience the world <br /> intelligently.
                      </TypeRow>
                      <TypeRow
                        label="Headline H2"
                        className="text-h2 !leading-tight"
                      >
                        Global destinations for the insider.
                      </TypeRow>
                      <TypeRow label="Section H3" className="text-h3">
                        Member Exclusive Benefits
                      </TypeRow>
                      <TypeRow
                        label="Body Large"
                        className="text-body-lg text-gray-600 leading-relaxed"
                      >
                        Precision algorithm scans 400+ airlines to find the
                        exact moment when premium seats drop in price, giving
                        you mathematical control over luxury.
                      </TypeRow>
                      <TypeRow
                        label="Body Regular"
                        className="text-body text-gray-500 leading-relaxed"
                      >
                        Virstravel is not just a booking platform; it's your
                        insider companion. We provide the tools for you to
                        navigate the world with absolute confidence and global
                        competence.
                      </TypeRow>
                    </div>

                    <div className="space-y-8">
                      <Card className="h-fit border-0 bg-gray-50/50">
                        <CardContent className="p-10 space-y-8">
                          <div className="space-y-2">
                            <p className="text-micro font-bold text-gray-400 uppercase tracking-widest">
                              Primary Typeface
                            </p>
                            <p className="text-h2 font-black text-dark-900">
                              Inter
                            </p>
                          </div>
                          <div className="space-y-6">
                            <p className="text-h1 break-all tracking-tighter leading-[0.85] opacity-20 hover:opacity-100 transition-opacity">
                              AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz
                            </p>
                            <p className="text-small text-gray-500 leading-relaxed font-medium">
                              Inter is a variable font family crafted for high
                              legibility on digital interfaces.
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </section>

                {/* 3. Components */}
                <section id="components" className="scroll-mt-32">
                  <div className="flex items-baseline justify-between border-b border-gray-100 pb-10 mb-16">
                    <h2 className="text-h2 text-dark-900">Component Metrics</h2>
                    <p className="text-small font-bold text-gray-300 tracking-[0.2em]">
                      03 / 04
                    </p>
                  </div>

                  <div className="space-y-32">
                    <div>
                      <h3 className="text-h4 text-dark-900 font-bold mb-10 pl-4 border-l-4 border-primary-100">
                        The "Weighted" Button
                      </h3>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
                        <ComponentPreview label="Primary / Default">
                          <Button>Book Now</Button>
                        </ComponentPreview>
                        <ComponentPreview label="Accent / Call-to-Action">
                          <Button variant="accent">Unlock Deals</Button>
                        </ComponentPreview>
                        <ComponentPreview label="Premium Outline">
                          <Button variant="outline">View Map</Button>
                        </ComponentPreview>
                        <ComponentPreview label="Ghost / Secondary">
                          <Button variant="ghost">Cancel</Button>
                        </ComponentPreview>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-16">
                      <div className="space-y-10">
                        <h3 className="text-h4 text-dark-900 font-bold pl-4 border-l-4 border-primary-100">
                          Form Densities
                        </h3>
                        <div className="space-y-6">
                          <div className="p-6 rounded-2xl border border-gray-100 bg-white hover:border-primary-500 transition-all cursor-pointer group shadow-sm hover:shadow-md">
                            <p className="text-micro font-black text-gray-400 group-hover:text-primary-500 transition-colors uppercase tracking-widest mb-1">
                              Arrival Date
                            </p>
                            <p className="text-body font-bold text-dark-900">
                              Oct 24, 2026
                            </p>
                          </div>
                          <div className="p-6 rounded-2xl border-2 border-primary-500 bg-primary-100/5 shadow-premium">
                            <div className="flex items-center justify-between mb-1">
                              <p className="text-micro font-black text-primary-500 uppercase tracking-widest">
                                Focused Target
                              </p>
                              <Badge className="bg-primary-500 text-white border-0 text-[9px] h-4 font-black">
                                ACTIVE
                              </Badge>
                            </div>
                            <p className="text-body font-bold text-dark-900">
                              London Heathrow (LHR)
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-10">
                        <h3 className="text-h4 text-dark-900 font-bold pl-4 border-l-4 border-primary-100">
                          Symmetry & Spacing
                        </h3>
                        <Card className="border-dashed border-2 border-gray-200 bg-gray-50/30 relative overflow-hidden group">
                          <div className="absolute inset-0 grid grid-cols-12 gap-4 px-6 opacity-0 group-hover:opacity-10 transition-opacity">
                            {[...Array(12)].map((_, i) => (
                              <div key={i} className="bg-primary-500 h-full" />
                            ))}
                          </div>
                          <CardContent className="p-10 relative z-10 space-y-6">
                            <p className="text-micro font-black text-gray-400 uppercase tracking-widest">
                              8pt Internal Symmetry
                            </p>
                            <div className="flex gap-3 items-end">
                              <div
                                className="w-2 h-2 bg-primary-500 rounded-sm"
                                title="8px"
                              />
                              <div
                                className="w-4 h-4 bg-primary-500 rounded-sm"
                                title="16px"
                              />
                              <div
                                className="w-8 h-8 bg-primary-500 rounded-sm"
                                title="32px"
                              />
                              <div
                                className="w-12 h-12 bg-primary-500 rounded-sm shadow-lg shadow-primary-500/20"
                                title="48px"
                              />
                            </div>
                            <p className="text-small text-gray-500 leading-relaxed font-medium">
                              We utilize a strict 8pt grid for internal padding
                              and external margins, creating a rhythmic, calm
                              experience.
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 4. Motion */}
                <section id="motion" className="scroll-mt-32">
                  <div className="flex items-baseline justify-between border-b border-gray-100 pb-10 mb-16">
                    <h2 className="text-h2 text-dark-900">
                      Interaction & Motion
                    </h2>
                    <p className="text-small font-bold text-gray-300 tracking-[0.2em]">
                      04 / 04
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    <MotionPlayground
                      title="Kinetic Lift"
                      className="hover:-translate-y-3 hover:shadow-2xl hover:shadow-primary-900/10 hover:border-primary-100"
                      description="Cards and buttons respond to user focus with a weightless vertical lift."
                    />
                    <MotionPlayground
                      title="Entrance Blur"
                      className="animate-in fade-in slide-in-from-bottom-6 blur-in-sm duration-1000"
                      description="Elements arrive with a high-fidelity fade and subtle upward translation."
                    />
                    <MotionPlayground
                      title="Focus Target"
                      className="hover:ring-8 hover:ring-primary-100 transition-all duration-300"
                      description="Engagement targets expand their hit area through visual ring focus."
                    />
                  </div>
                </section>
              </div>
            </Container>
          </div>
        </main>
      </div>
    </div>
  );
}

function ColorChip({ color, label, hex, text, usage }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-4 group">
      <div
        onClick={copy}
        className={cn(
          "h-40 rounded-3xl border border-black/5 flex flex-col items-center justify-center cursor-copy transition-all duration-500 group-hover:scale-[1.03] group-hover:shadow-2xl relative overflow-hidden",
          color,
        )}
      >
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center transition-opacity duration-300",
            copied ? "opacity-100 bg-black/10 backdrop-blur-sm" : "opacity-0",
          )}
        >
          <div className="bg-white text-dark-900 px-4 py-2 rounded-full text-micro font-bold shadow-xl flex items-center gap-2">
            <Check className="h-3 w-3" />
            COPIED
          </div>
        </div>
        {!copied && (
          <Copy
            className={cn(
              "h-6 w-6 opacity-0 group-hover:opacity-40 transition-opacity",
              text,
            )}
          />
        )}
      </div>
      <div className="space-y-1 px-1">
        <div className="flex items-center justify-between">
          <span className="text-small font-black text-dark-900 tracking-tight">
            {label}
          </span>
          <span className="text-micro font-bold text-gray-400 font-mono">
            {hex}
          </span>
        </div>
        <p className="text-micro text-gray-500 font-medium uppercase tracking-widest">
          {usage}
        </p>
      </div>
    </div>
  );
}

function TypeRow({ label, className, children }) {
  return (
    <div className="space-y-4 pb-12 border-b border-gray-100 last:border-0">
      <p className="text-micro font-bold text-gray-300 uppercase tracking-[0.3em]">
        {label}
      </p>
      <div className={className}>{children}</div>
    </div>
  );
}

function ComponentPreview({ label, children }) {
  return (
    <div className="space-y-4">
      <p className="text-micro font-black text-gray-300 uppercase tracking-widest pl-1">
        {label}
      </p>
      <div className="p-12 rounded-3xl bg-gray-50/50 border border-gray-100 flex items-center justify-center min-h-[160px] transition-all hover:bg-white hover:shadow-inner">
        {children}
      </div>
    </div>
  );
}

function MotionPlayground({ title, className, description }) {
  return (
    <Card
      className={cn(
        "overflow-hidden group cursor-pointer border-gray-100 transition-all duration-500",
        className,
      )}
    >
      <CardContent className="p-10 space-y-6">
        <div className="h-16 w-16 rounded-2xl bg-primary-700 flex items-center justify-center text-white mb-2 shadow-lg shadow-primary-700/20 group-hover:rotate-12 transition-transform duration-500">
          <Info className="h-8 w-8" />
        </div>
        <div className="space-y-2">
          <h4 className="text-h4 font-black text-dark-900">{title}</h4>
          <p className="text-small text-gray-500 leading-relaxed font-medium">
            {description}
          </p>
        </div>
        <div className="pt-4 flex items-center gap-2 text-primary-700 font-bold text-micro tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
          TEST INTERACTION <ChevronRight className="h-3 w-3" />
        </div>
      </CardContent>
    </Card>
  );
}
