// components/HotelAutocomplete.tsx
"use client";

import { searchHotelLocations } from "@/actions/amadeus";
import { useDebounce } from "use-debounce";
import { useEffect, useState } from "react";

export const HotelAutocomplete = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedQuery] = useDebounce(query, 300); // 300ms delay

  useEffect(() => {
    if (debouncedQuery.length < 2) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      setIsLoading(true);
      const results = await searchHotelLocations(debouncedQuery);
      setSuggestions(results);
      setIsLoading(false);
    };

    fetchSuggestions();
  }, [debouncedQuery]);

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search hotels or cities..."
        className="w-full p-2 border rounded"
      />

      {isLoading && (
        <div className="absolute z-10 w-full p-2 bg-white">Loading...</div>
      )}

      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg">
          {suggestions.map((location) => (
            <li
              key={location.id}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setQuery(location.name);
                setSuggestions([]);
              }}
            >
              <div className="font-medium">{location.name}</div>
              <div className="text-sm text-gray-500">
                {location.type === "HOTEL" ? "Hotel" : "City"} •{" "}
                {location.iataCode}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
