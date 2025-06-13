"use client";

import { getHotelAutocomplete } from "@/utils/amadeus";
import { useState } from "react";

export default function HotelSearchBox() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  //   const getHotelAutocomplete

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 2) {
      // Trigger after 3+ characters
      //   const res = await fetch(
      //     `/api/autocomplete?query=${value}&countryCode=GH`
      //   );
      const data = await getHotelAutocomplete(query);
      //   const data = await res.json();
      setSuggestions(data);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search hotels..."
      />
      <ul>
        {suggestions.map((hotel) => (
          <li key={hotel.id}>{hotel.name}</li>
        ))}
      </ul>
    </div>
  );
}
