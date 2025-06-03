import { autoCompletePlaces } from "@/lib/google";
import { useEffect, useState } from "react";
import { Input } from "./input";
import InputSuggestion from "./input-suggestion";

const AddressInput = ({
  placeholder = "Enter address...",
  value, // Receive value prop from parent
  onChange, // Receive onChange prop from parent
  query,
  setQuery,
  shouldSearch,
  setShouldSearch,
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [search, setSearch] = useState(shouldSearch);

  useEffect(() => {
    const fetchSuggestions = async () => {
      const results = await autoCompletePlaces(query);
      setSuggestions(results);
    };

    if (query && search && query.length > 2) {
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [query]);

  return (
    <div>
      <Input
        placeholder={placeholder}
        value={value || query}
        onChange={(e) => {
          setQuery(e.target.value);
          onChange(e.target.value);
          setSearch(true);
        }}
        onFocus={() => setSearch(true)}
        onBlur={() =>
          setTimeout(() => {
            setSearch(false);
            setShouldSearch(false);
          }, 200)
        } // Small delay to allow click
      />
      <div className="mt-2">
        {suggestions.map((suggestion) => (
          <InputSuggestion
            key={suggestion.place_id}
            suggestion={suggestion}
            onClick={() => {
              const selectedValue = suggestion.description;
              setQuery(selectedValue);
              onChange(selectedValue); // Update parent state
              setSearch(false);
              setShouldSearch(false);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AddressInput;
