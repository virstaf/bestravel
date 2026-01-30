"use client";

import React, { useRef, useEffect } from "react";
import { useLoadScript } from "@react-google-maps/api";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

const libraries = ["places"];

export function AddressAutocomplete({
  value,
  onChange,
  onPlaceSelect,
  placeholder = "Start typing your address...",
  ...props
}) {
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  useEffect(() => {
    if (!isLoaded || !inputRef.current) return;

    // Initialize Google Places Autocomplete
    autocompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      {
        types: ["address"],
        fields: ["address_components", "formatted_address", "geometry"],
      },
    );

    // Listen for place selection
    const listener = autocompleteRef.current.addListener(
      "place_changed",
      () => {
        const place = autocompleteRef.current.getPlace();

        if (!place.address_components) return;

        // Extract address components
        const addressComponents = {};
        place.address_components.forEach((component) => {
          const types = component.types;
          if (types.includes("street_number")) {
            addressComponents.street_number = component.long_name;
          }
          if (types.includes("route")) {
            addressComponents.route = component.long_name;
          }
          if (types.includes("locality")) {
            addressComponents.city = component.long_name;
          }
          if (types.includes("administrative_area_level_1")) {
            addressComponents.state = component.long_name;
          }
          if (types.includes("country")) {
            addressComponents.country = component.long_name;
          }
          if (types.includes("postal_code")) {
            addressComponents.postal_code = component.long_name;
          }
        });

        // Build address line 1
        const addressLine1 = [
          addressComponents.street_number,
          addressComponents.route,
        ]
          .filter(Boolean)
          .join(" ");

        // Call the onPlaceSelect callback with parsed data
        if (onPlaceSelect) {
          onPlaceSelect({
            address_line1: addressLine1 || place.formatted_address,
            city: addressComponents.city || "",
            postal_code: addressComponents.postal_code || "",
            country: addressComponents.country || "",
            state: addressComponents.state || "",
          });
        }
      },
    );

    return () => {
      if (listener) {
        window.google.maps.event.removeListener(listener);
      }
    };
  }, [isLoaded, onPlaceSelect]);

  if (loadError) {
    return (
      <Input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...props}
      />
    );
  }

  if (!isLoaded) {
    return (
      <div className="relative">
        <Input
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled
          {...props}
        />
        <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <Input
      ref={inputRef}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      {...props}
    />
  );
}
