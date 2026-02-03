"use client";

import * as React from "react";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker({ value, onChange, placeholder = "Pick a date" }) {
  const [date, setDate] = React.useState(value ? new Date(value) : undefined);

  React.useEffect(() => {
    if (value) {
      setDate(new Date(value));
    }
  }, [value]);

  const handleSelect = (selectedDate) => {
    setDate(selectedDate);
    if (selectedDate && onChange) {
      // Format as YYYY-MM-DD for database storage
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      onChange(formattedDate);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          data-empty={!date}
          className={cn(
            "w-full justify-between text-left font-normal",
            "data-[empty=true]:text-muted-foreground",
          )}
        >
          {date ? format(date, "PPP") : <span>{placeholder}</span>}
          <ChevronDownIcon className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
          defaultMonth={date}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
