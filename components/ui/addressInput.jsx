// "use client";

import { autoCompletePlaces } from "@/lib/google";
import { useEffect, useState } from "react";
import { Input } from "./input";
import InputSuggestion from "./input-suggestion";

const AddressInput = ({ placeholder, value, onChange }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (value && value.length > 2 && isFocused) {
        const results = await autoCompletePlaces(value);
        setSuggestions(results);
      } else {
        setSuggestions([]);
      }
    };
    fetchSuggestions();
  }, [value, isFocused]);

  return (
    <div>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
      />
      {isFocused && suggestions.length > 0 && (
        <div className="mt-2">
          {suggestions.map((suggestion) => (
            <InputSuggestion
              key={suggestion.place_id}
              suggestion={suggestion}
              onClick={() => onChange(suggestion.description)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AddressInput;
