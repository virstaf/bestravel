"use client";

import React, { useState, useEffect } from "react";
import { createDealRequest } from "@/actions/deal-requests";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { LocationInput } from "./ui/location-input";
import { DateRangePicker } from "./ui/date-range-picker";
import { AuthDialog } from "./auth-dialog";
import useUserStore from "@/user.store";
import { toast } from "sonner";

export function HeroForm() {
  const [fromLocation, setFromLocation] = useState(null);
  const [toLocation, setToLocation] = useState(null);
  const [dateRange, setDateRange] = useState();
  const [travelTypes, setTravelTypes] = useState(["flights"]);
  const [authOpen, setAuthOpen] = useState(false);

  const { isAuthenticated, fetchUser, user } = useUserStore();

  useEffect(() => {
    fetchUser();
  }, []);

  const handleRequestDeal = () => {
    if (!fromLocation || !toLocation) {
      toast.error("Please select both From and To destinations.");
      return;
    }

    if (!dateRange?.from) {
      toast.error("Please select a departure date.");
      return;
    }

    if (!isAuthenticated) {
      setAuthOpen(true);
      return;
    }

    submitDealRequest();
  };

  // ... inside component

  const submitDealRequest = async () => {
    const response = await createDealRequest({
      from: fromLocation,
      to: toLocation,
      types: travelTypes,
      dates: dateRange,
    });

    if (response?.errorMessage) {
      toast.error(response.errorMessage);
    } else {
      toast.success("Request received! We'll email you shortly.");
      setFromLocation(null);
      setToLocation(null);
      setDateRange(undefined);
      setTravelTypes(["flights"]);
    }
  };

  const handleAuthSuccess = () => {
    setAuthOpen(false);
    // Refresh user state to ensure isAuthenticated is true
    fetchUser().then(() => {
      // Small delay to allow state update? Or just call submit directly since we know they are legit now.
      // fetchUser updates store, so re-render triggers.
      // But submitDealRequest relies on `user` object from store?
      // onSuccess from AuthDialog passes the profile/user, so we could use that.
      submitDealRequest();
    });
  };

  return (
    <div className="mx-auto mt-10 max-w-3xl rounded-2xl bg-card text-card-foreground p-6 shadow-xl text-left">
      <AuthDialog
        open={authOpen}
        onOpenChange={setAuthOpen}
        onSuccess={handleAuthSuccess}
      />

      {/* Destination */}
      <div className="space-y-2">
        <Label className="text-base font-medium">
          Where do you want to go?
        </Label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <LocationInput
              placeholder="From (e.g. Gatwick)"
              onSelect={setFromLocation}
            />
          </div>
          <div className="relative">
            <LocationInput
              placeholder="To (e.g. Dubai)"
              onSelect={setToLocation}
            />
          </div>
        </div>
      </div>

      {/* Travel Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {/* Dates */}
        <div className="space-y-2">
          <Label className="text-base font-medium">
            When are you traveling?
          </Label>
          <DateRangePicker date={dateRange} setDate={setDateRange} />
        </div>

        <div className="space-y-2">
          <div className="flex items-baseline gap-2">
            <Label className="text-base font-medium">
              What are you looking for?
            </Label>
            <span className="text-xs text-muted-foreground font-normal">
              (Select all that apply)
            </span>
          </div>
          <ToggleGroup
            type="multiple"
            value={travelTypes}
            onValueChange={setTravelTypes}
            className="justify-start gap-3 flex-wrap"
          >
            <ToggleGroupItem
              value="flights"
              className="h-10 px-6 rounded-full border border-input data-[state=on]:bg-secondary data-[state=on]:text-secondary-foreground data-[state=on]:border-secondary hover:bg-secondary/10 hover:text-secondary-foreground transition-all"
            >
              Flights
            </ToggleGroupItem>
            <ToggleGroupItem
              value="hotels"
              className="h-10 px-6 rounded-full border border-input data-[state=on]:bg-secondary data-[state=on]:text-secondary-foreground data-[state=on]:border-secondary hover:bg-secondary/10 hover:text-secondary-foreground transition-all"
            >
              Hotels
            </ToggleGroupItem>
            <ToggleGroupItem
              value="transfers"
              className="h-10 px-6 rounded-full border border-input data-[state=on]:bg-secondary data-[state=on]:text-secondary-foreground data-[state=on]:border-secondary hover:bg-secondary/10 hover:text-secondary-foreground transition-all"
            >
              Transfers
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>

      {/* CTA */}
      <Button
        onClick={handleRequestDeal}
        className="mt-8 w-full h-14 text-lg font-semibold bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-md transition-all"
      >
        Find me the best deals →
      </Button>

      {/* Trust */}
      <div className="mt-4 text-xs text-muted-foreground flex flex-wrap gap-4 justify-center font-medium">
        <span>✓ Save up to 30%</span>
        <span>✓ No booking fees</span>
        <span>✓ 24/7 support</span>
      </div>
    </div>
  );
}
