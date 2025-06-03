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

// const AddressInput = ({
//   placeholder = "Enter address...",
//   value, // Receive value prop from parent
//   onChange, // Receive onChange prop from parent
//   query,
//   setQuery,
//   shouldSearch,
//   setShouldSearch,
// }) => {
//   const [suggestions, setSuggestions] = useState([]);
//   const [search, setSearch] = useState(shouldSearch);

//   useEffect(() => {
//     const fetchSuggestions = async () => {
//       const results = await autoCompletePlaces(query);
//       setSuggestions(results);
//     };

//     if (query && search && query.length > 2) {
//       fetchSuggestions();
//     } else {
//       setSuggestions([]);
//     }
//   }, [query]);

//   return (
//     <div>
//       <Input
//         placeholder={placeholder}
//         value={value || query}
//         onChange={(e) => {
//           setQuery(e.target.value);
//           onChange(e.target.value);
//           setSearch(true);
//         }}
//         onFocus={() => setSearch(true)}
//         onBlur={() => {
//           setSuggestions([]);
//           setTimeout(() => {
//             setSearch(false);
//             setShouldSearch(false);
//           }, 200);
//         }}
//       />
//       <div className="mt-2">
//         {suggestions.map((suggestion) => (
//           <InputSuggestion
//             key={suggestion.place_id}
//             suggestion={suggestion}
//             onClick={() => {
//               const selectedValue = suggestion.description;
//               setQuery(selectedValue);
//               onChange(selectedValue); // Update parent state
//               setSearch(false);
//               setShouldSearch(false);
//               setSuggestions([]); // Clear suggestions after selection
//             }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

export default AddressInput;
