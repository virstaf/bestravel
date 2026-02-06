"use client";

import * as React from "react";
import { MapPin, Loader2 } from "lucide-react";
import { useDebounce } from "use-debounce";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { autoCompletePlaces } from "@/lib/google";

export function LocationInput({ className, placeholder, onSelect, ...props }) {
  const [query, setQuery] = React.useState("");
  const [suggestions, setSuggestions] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [debouncedQuery] = useDebounce(query, 300);
  const wrapperRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  React.useEffect(() => {
    if (debouncedQuery.length < 2) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      setIsLoading(true);
      try {
        const results = await autoCompletePlaces(debouncedQuery, {
          types: ["(cities)"],
        });
        setSuggestions(results || []);
        setIsLoading(false);
        setIsOpen(true);
      } catch (error) {
        console.error("Error fetching places:", error);
        setSuggestions([]);
        setIsLoading(false);
      }
    };

    fetchSuggestions();
  }, [debouncedQuery]);

  const handleSelect = (prediction) => {
    // structured_formatting.main_text avoids showing the country in the input if desired,
    // but description is safer for full context. Using main_text for now as it looks cleaner for a "City" field.
    const name =
      prediction.structured_formatting?.main_text || prediction.description;
    setQuery(name);
    setSuggestions([]);
    setIsOpen(false);
    if (onSelect) {
      onSelect({
        name: name,
        description: prediction.description,
        place_id: prediction.place_id,
      });
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    if (e.target.value.length < 2) {
      setIsOpen(false);
    }
  };

  return (
    <div ref={wrapperRef} className={cn("relative", className)}>
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="pl-10 h-12 text-base not-focus:italic"
          {...props}
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          </div>
        )}
      </div>

      {isOpen && suggestions.length > 0 && (
        <ul className="absolute z-50 w-full mt-1 bg-popover text-popover-foreground border rounded-md shadow-lg max-h-60 overflow-auto py-1">
          {suggestions.map((prediction) => (
            <li
              key={prediction.place_id}
              className="px-4 py-2 hover:bg-accent hover:text-accent-foreground cursor-pointer flex items-center justify-between group"
              onClick={() => handleSelect(prediction)}
            >
              <div className="flex flex-col text-left">
                <span className="font-medium">
                  {prediction.structured_formatting?.main_text ||
                    prediction.description}
                </span>
                <span className="text-xs text-muted-foreground group-hover:text-accent-foreground/70">
                  {prediction.structured_formatting?.secondary_text}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
