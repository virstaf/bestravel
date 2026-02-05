"use client";

import React from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { LocationInput } from "./ui/location-input";

export function HeroForm() {
  return (
    <div className="mx-auto mt-10 max-w-3xl rounded-2xl bg-card text-card-foreground p-6 shadow-xl text-left">
      {/* Destination */}
      <div className="space-y-2">
        <Label className="text-base font-medium">
          Where do you want to go?
        </Label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <LocationInput
              placeholder="From (e.g. Gatwick)"
              onSelect={(location) => console.log("Selected From:", location)}
            />
          </div>
          <div className="relative">
            <LocationInput
              placeholder="To (e.g. Dubai)"
              onSelect={(location) => console.log("Selected To:", location)}
            />
          </div>
        </div>
      </div>

      {/* Travel Type */}
      <div className="mt-6 space-y-2">
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
          defaultValue={["flights"]}
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

      {/* CTA */}
      <Button className="mt-8 w-full h-14 text-lg font-semibold bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-md transition-all">
        Show me member deals →
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
