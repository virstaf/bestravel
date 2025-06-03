"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import AddressInput from "./ui/addressInput";

const FlightReservationForm = ({ trip, onSubmit, loading }) => {
  const [isCheckInBag, setIsCheckInBag] = useState(false);
  const [formData, setFormData] = useState({
    departureCity: "",
    arrivalCity: trip.destination.split(",")[0].trim(), // Auto-fill from trip
    departureDate: trip.start_date,
    returnDate: trip.end_date,
    adults: 1,
    children: 0,
    class: "economy",
    airlinePreference: "",
    specialRequests: "",
    checkInBag: isCheckInBag,
  });

  const [departureQuery, setDepartureQuery] = useState("");
  const [shouldDepartureSearch, setShouldDepartureSearch] = useState(true);
  const [arrivalQuery, setArrivalQuery] = useState("");
  const [shouldArrivalSearch, setShouldArrivalSearch] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    console.log(formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="mb-1">Departure City</Label>
            {/* <Input
              value={formData.departureCity}
              placeholder="City or airport code"
              onChange={(e) =>
                setFormData({ ...formData, departureCity: e.target.value })
              }
              required
            /> */}
            <AddressInput
              placeholder="Enter departure city or airport code"
              value={formData.departureCity}
              onChange={(value) =>
                setFormData({ ...formData, departureCity: value })
              }
              query={departureQuery}
              setQuery={setDepartureQuery}
              shouldSearch={shouldDepartureSearch}
              setShouldSearch={setShouldDepartureSearch}
            />
          </div>

          <div>
            <Label className="mb-1">Arrival City</Label>
            <AddressInput
              placeholder="Enter arrival city or airport code"
              value={formData.arrivalCity}
              onChange={(value) =>
                setFormData({ ...formData, arrivalCity: value })
              }
              query={arrivalQuery}
              setQuery={setArrivalQuery}
              shouldSearch={shouldArrivalSearch}
              setShouldSearch={setShouldArrivalSearch}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="mb-1">Departure Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full">
                  {format(new Date(formData.departureDate), "PPP")}
                  <CalendarIcon className="ml-2 h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={new Date(formData.departureDate)}
                  onSelect={(date) =>
                    setFormData({ ...formData, departureDate: date })
                  }
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label className="mb-1">Return Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full">
                  {format(new Date(formData.returnDate), "PPP")}
                  <CalendarIcon className="ml-2 h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={new Date(formData.returnDate)}
                  onSelect={(date) =>
                    setFormData({ ...formData, returnDate: date })
                  }
                  disabled={(date) => date < new Date(formData.departureDate)}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="">
            <Label className="mb-1">Adults</Label>
            <Input
              type="number"
              min="1"
              max="10"
              value={formData.adults}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  adults: e.target.value,
                })
              }
            />
          </div>
          <div className="">
            <Label className="mb-1">Children</Label>
            <Input
              type="number"
              min="0"
              max="10"
              value={formData.children}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  children: e.target.value,
                })
              }
            />
          </div>
        </div>

        {formData.children > 0 && (
          <div className="children-age">
            {Array.from({ length: formData.children }).map((_, index) => (
              <div className="mb-2 grid grid-cols-2" key={index}>
                <Label className="mb-1">Age of child {index + 1}</Label>
                <Input
                  type="number"
                  min="0"
                  max="17"
                  placeholder="Age in years"
                  value={formData[`child${index + 1}Age`] || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [`child${index + 1}Age`]: e.target.value,
                    })
                  }
                />
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="mb-1">Class</Label>
            <Select
              value={formData.class}
              onValueChange={(value) =>
                setFormData({ ...formData, class: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="economy">Economy</SelectItem>
                <SelectItem value="premium">Premium Economy</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="first">First Class</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="mb-1">Airline Preference</Label>
            <Input
              value={formData.airlinePreference}
              placeholder="Specific airline (optional)"
              onChange={(e) =>
                setFormData({ ...formData, airlinePreference: e.target.value })
              }
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="mb-1">Special Requests</Label>
            <Input
              value={formData.specialRequests}
              placeholder="Seat preferences, meal restrictions, etc."
              onChange={(e) =>
                setFormData({ ...formData, specialRequests: e.target.value })
              }
            />
          </div>
          <div className="">
            <Label className="mb-1">Check in bag required?</Label>
            <div className="flex mt-1">
              <input
                type="checkbox"
                name="check-in-bag"
                id="check-in-bag"
                checked={isCheckInBag}
                onChange={(e) => {
                  setIsCheckInBag(e.target.checked);
                  setFormData({
                    ...formData,
                    checkInBag: e.target.checked,
                  });
                }}
              />
              <p className="text-sm text-gray-500 ml-2">
                Check this box if you have some luggage to check in.
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <Button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Request Flights"}
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/dashboard/trips/${trip.id}`}>Back</Link>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FlightReservationForm;
