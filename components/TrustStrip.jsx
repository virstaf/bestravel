"use client";

import { Check, Shield, Clock, Users, CreditCard } from "lucide-react";

const TrustStrip = () => {
  const trustItems = [
    {
      icon: Users,
      text: "Trusted by 1,000+ travelers",
    },
    {
      icon: CreditCard,
      text: "Secure payments",
    },
    {
      icon: Clock,
      text: "Human support, 24/7",
    },
    {
      icon: Shield,
      text: "Flexible booking options",
    },
  ];

  return (
    <section className="w-full bg-gradient-to-b from-background to-muted/30 border-y border-border/40 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-3 justify-center md:justify-start"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">
                      {item.text}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustStrip;
