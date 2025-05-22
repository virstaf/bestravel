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

const FlightReservationForm = ({ trip, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    departureCity: "",
    arrivalCity: trip.destination.split(",")[0].trim(), // Auto-fill from trip
    departureDate: trip.start_date,
    returnDate: trip.end_date,
    passengers: 1,
    class: "economy",
    airlinePreference: "",
    specialRequests: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="mb-1">Departure City</Label>
            <Input
              value={formData.departureCity}
              placeholder="City or airport code"
              onChange={(e) =>
                setFormData({ ...formData, departureCity: e.target.value })
              }
              required
            />
          </div>

          <div>
            <Label className="mb-1">Arrival City</Label>
            <Input
              value={formData.arrivalCity}
              placeholder="City or airport code"
              onChange={(e) =>
                setFormData({ ...formData, arrivalCity: e.target.value })
              }
              required
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
          <div>
            <Label className="mb-1">Passengers</Label>
            <Input
              type="number"
              min="1"
              max="10"
              value={formData.passengers}
              onChange={(e) =>
                setFormData({ ...formData, passengers: e.target.value })
              }
            />
          </div>

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

        <Button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Request Flights"}
        </Button>
      </form>
    </div>
  );
};

export default FlightReservationForm;
