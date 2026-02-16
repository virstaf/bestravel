"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Sparkles } from "lucide-react";
import { toast } from "sonner";

const DealAlertCTA = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsSubmitting(true);

    // TODO: Implement actual newsletter signup logic
    // For now, just show success message
    setTimeout(() => {
      toast.success("You're all set! We'll notify you of new deals.");
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="w-full bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-border/20">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full mb-4">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-semibold">Never Miss a Deal</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                Never Miss a Deal ✈️
              </h2>

              <p className="text-muted-foreground text-lg">
                Get notified when new travel deals drop — no spam, just savings.
              </p>
            </div>

            {/* Email Form */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3"
            >
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 text-base"
                  disabled={isSubmitting}
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="h-12 px-8 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold shadow-md hover:shadow-lg transition-all"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Subscribing..." : "Get Deal Alerts"}
              </Button>
            </form>

            {/* Trust indicators */}
            <div className="flex items-center justify-center gap-6 mt-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <span>✓</span>
                <span>No spam, ever</span>
              </div>
              <div className="flex items-center gap-1">
                <span>✓</span>
                <span>Unsubscribe anytime</span>
              </div>
              <div className="flex items-center gap-1">
                <span>✓</span>
                <span>Exclusive deals</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealAlertCTA;
