import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { autoCompletePlaces } from "@/lib/google";
import { useEffect, useState } from "react";

const AddressInput = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  //   const handleInputChange = (e) => {
  //     setQuery(e.target.value);
  //   };

  useEffect(() => {
    const fetchSuggestions = async () => {
      const results = await autoCompletePlaces(query);
      setSuggestions(results);
    };

    if (query) {
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [query]);

  return (
    <Command>
      <CommandInput
        placeholder="Type a location..."
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {suggestions && (
          <CommandGroup heading="Suggestions">
            {suggestions.map((suggestion) => (
              <CommandItem key={suggestion.place_id}>
                {suggestion.description}
              </CommandItem>
            ))}
            //{" "}
          </CommandGroup>
        )}
        {/* <CommandSeparator /> */}
      </CommandList>
    </Command>
  );
};

export default AddressInput;
