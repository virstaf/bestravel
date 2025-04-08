"use client";

import { useState } from "react";
// import { Input } from "./ui/input";
import { Search } from "lucide-react";

const SearchComponent = () => {
  const [query, setQuery] = useState("");
  return (
    <div className="max-w-[350px] border rounded-lg flex items-center">
      <span className="text-muted-foreground p-2">
        <Search />
      </span>
      <input
        type="search"
        placeholder="Search"
        className="p-2 active:border-0"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
    </div>
  );
};

export default SearchComponent;
