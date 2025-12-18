"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AddressInput from "@/components/ui/addressInput";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function BookingDialog({ deal, open, onOpenChange }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    pickupDate: null,
    pickupAirport: "",
    numberOfTravelers: 1,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate booking submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setStep(3); // Move to confirmation step
  };

  const handleClose = () => {
    setStep(1);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      pickupDate: null,
      numberOfTravelers: 1,
    });
    onOpenChange(false);
  };

  const [currentBasePrice, setCurrentBasePrice] = useState(
    deal?.original_price || 1299
  );

  useEffect(() => {
    if (deal) {
      let price = deal.original_price || 1299;

      if (formData.pickupAirport && deal.location_prices?.length > 0) {
        const matched = deal.location_prices.find(
          (lp) =>
            formData.pickupAirport
              .toLowerCase()
              .includes(lp.location.toLowerCase()) ||
            lp.location
              .toLowerCase()
              .includes(formData.pickupAirport.toLowerCase())
        );

        if (matched) {
          price = parseFloat(matched.price);
        }
      }
      setCurrentBasePrice(price);
    }
  }, [formData.pickupAirport, deal]);

  const originalPrice = currentBasePrice;
  const discountedPrice = deal?.discount_percentage
    ? originalPrice * (1 - deal.discount_percentage / 100)
    : deal?.discount_amount
      ? originalPrice - deal.discount_amount
      : originalPrice * 0.69;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        {step === 1 && (
          <>
            <DialogHeader>
              <DialogTitle>Book Your Deal</DialogTitle>
              <DialogDescription>
                Review your deal details before proceeding
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <h3 className="font-semibold text-lg">
                  {deal?.package_type || deal?.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {deal?.location || deal?.partners?.location}
                </p>
                <div className="flex items-baseline gap-2 pt-2">
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground font-normal">
                      Starting from
                    </span>
                    <span className="text-2xl font-bold">
                      £{Math.round(discountedPrice)}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground line-through">
                    £{originalPrice}
                  </span>
                  <span className="text-sm font-semibold text-green-600">
                    Save £{Math.round(originalPrice - discountedPrice)}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">What's Included:</h4>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  {deal?.includes_flight !== false && (
                    <li>Round-trip flights</li>
                  )}
                  <li>{deal?.duration_nights || 4}-night accommodation</li>
                  <li>Daily breakfast</li>
                  <li>Airport transfers</li>
                </ul>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={() => setStep(2)}>Continue to Booking</Button>
            </DialogFooter>
          </>
        )}

        {step === 2 && (
          <>
            <DialogHeader>
              <DialogTitle>Traveler Information</DialogTitle>
              <DialogDescription>
                Please provide your details to complete the booking
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Travel Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.pickupDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.pickupDate ? (
                        format(formData.pickupDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.pickupDate}
                      onSelect={(date) =>
                        setFormData((prev) => ({ ...prev, pickupDate: date }))
                      }
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pickupAirport">Pickup Airport (Optional)</Label>
                <AddressInput
                  placeholder="Start typing airport name..."
                  value={formData.pickupAirport}
                  onChange={(val) =>
                    setFormData((prev) => ({ ...prev, pickupAirport: val }))
                  }
                  searchOptions={{ types: ["airport"] }}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="numberOfTravelers">Number of Travelers</Label>
                <Input
                  id="numberOfTravelers"
                  name="numberOfTravelers"
                  type="number"
                  min="1"
                  max="10"
                  value={formData.numberOfTravelers}
                  onChange={handleInputChange}
                />
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                >
                  Back
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Processing..." : "Confirm Booking"}
                </Button>
              </DialogFooter>
            </form>
          </>
        )}

        {step === 3 && (
          <>
            <DialogHeader>
              <div className="flex flex-col items-center space-y-4 py-6">
                <CheckCircle2 className="h-16 w-16 text-green-500" />
                <DialogTitle className="text-2xl">
                  Booking Confirmed!
                </DialogTitle>
                <DialogDescription className="text-center">
                  Your booking has been successfully submitted. We've sent a
                  confirmation email to {formData.email}
                </DialogDescription>
              </div>
            </DialogHeader>

            <div className="bg-muted p-4 rounded-lg space-y-2">
              <h4 className="font-semibold">Booking Summary</h4>
              <div className="text-sm space-y-1">
                <p>
                  <span className="text-muted-foreground">Name:</span>{" "}
                  {formData.firstName} {formData.lastName}
                </p>
                <p>
                  <span className="text-muted-foreground">Email:</span>{" "}
                  {formData.email}
                </p>
                {formData.pickupDate && (
                  <p>
                    <span className="text-muted-foreground">Pickup Date:</span>{" "}
                    {format(formData.pickupDate, "PPP")}
                  </p>
                )}
                {formData.pickupAirport && (
                  <p>
                    <span className="text-muted-foreground">
                      Pickup Airport:
                    </span>{" "}
                    {formData.pickupAirport}
                  </p>
                )}
                <p>
                  <span className="text-muted-foreground">Travelers:</span>{" "}
                  {formData.numberOfTravelers}
                </p>
                <p className="font-semibold pt-2">
                  Total: £
                  {Math.round(discountedPrice * formData.numberOfTravelers)}
                </p>
              </div>
            </div>

            <DialogFooter>
              <Button onClick={handleClose} className="w-full">
                Close
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
