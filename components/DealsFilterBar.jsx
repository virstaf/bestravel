"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useDebounce } from "use-debounce";
import {
  MapPin,
  SlidersHorizontal,
  Calendar,
  PoundSterling,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { cn } from "@/lib/utils";

const DealsFilterBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [isSticky, setIsSticky] = useState(false);

  // Initialize state from URL
  const [dest, setDest] = useState(searchParams.get("dest") || "");
  const [date, setDate] = useState({
    from: searchParams.get("from")
      ? new Date(searchParams.get("from"))
      : undefined,
    to: searchParams.get("to") ? new Date(searchParams.get("to")) : undefined,
  });
  const [priceRange, setPriceRange] = useState(
    Number(searchParams.get("maxPrice")) || 5000,
  );
  const [sort, setSort] = useState(searchParams.get("sort") || "best-value");

  const [debouncedDest] = useDebounce(dest, 500);
  const [debouncedPrice] = useDebounce(priceRange, 500);

  // Update URL when filters change
  const updateFilters = (updates) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    updateFilters({ dest: debouncedDest });
  }, [debouncedDest]);

  useEffect(() => {
    updateFilters({ maxPrice: debouncedPrice });
  }, [debouncedPrice]);

  const handleDateChange = (newDate) => {
    setDate(newDate);
    updateFilters({
      from: newDate?.from?.toISOString().split("T")[0],
      to: newDate?.to?.toISOString().split("T")[0],
    });
  };

  const handleSortChange = (newSort) => {
    setSort(newSort);
    updateFilters({ sort: newSort });
  };

  // Handle scroll for sticky state
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = 600;
      setIsSticky(window.scrollY > heroHeight - 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={cn(
        "sticky top-16 z-40 w-full transition-all duration-300",
        isSticky
          ? "bg-white/98 backdrop-blur-lg shadow-lg border-b border-border/40"
          : "bg-gradient-to-b from-white to-background/50 border-b border-border/20",
      )}
    >
      <div className="container mx-auto px-4 py-6">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">
              Find the perfect trip in seconds
            </h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-muted-foreground hover:text-foreground"
            onClick={() => {
              setDest("");
              setDate({ from: undefined, to: undefined });
              setPriceRange(5000);
              setSort("best-value");
              router.push(pathname, { scroll: false });
            }}
          >
            Reset All
          </Button>
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Destination Search */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              Destination
            </label>
            <div className="relative">
              <Input
                placeholder="e.g. Maldives, Bali..."
                value={dest}
                onChange={(e) => setDest(e.target.value)}
                className="h-11 bg-white border-border/60 focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>

          {/* Date Picker */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              Travel Dates
            </label>
            <DateRangePicker
              className="w-full"
              date={date}
              setDate={handleDateChange}
            />
          </div>

          {/* Price Range Slider */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
              <PoundSterling className="w-3.5 h-3.5" />
              Max Budget
            </label>
            <div className="bg-white border border-border/60 rounded-lg px-4 py-2.5 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-foreground">
                  £{priceRange.toLocaleString()}
                </span>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  step="100"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-[60%] h-2 bg-gradient-to-r from-primary/20 to-primary rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110"
                />
                <span className="text-xs text-muted-foreground">
                  per person
                </span>
              </div>
            </div>
          </div>

          {/* Sort Dropdown */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">
              Sort By
            </label>
            <Select value={sort} onValueChange={handleSortChange}>
              <SelectTrigger className="h-11 bg-white border-border/60 focus:border-primary focus:ring-1 focus:ring-primary/20">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="best-value">💎 Best Value</SelectItem>
                <SelectItem value="lowest-price">💰 Lowest Price</SelectItem>
                <SelectItem value="popular">🔥 Popular</SelectItem>
                <SelectItem value="ending-soon">⏰ Ending Soon</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealsFilterBar;
