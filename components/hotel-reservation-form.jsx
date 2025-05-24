"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

const HotelReservationForm = ({ trip, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    city: "",
    preferredHotel: "",
    preferredLocation: "",
    checkIn: trip.start_date,
    checkOut: trip.end_date,
    rooms: 1,
    starRating: 3,
    roomType: "single",
    meals: "all-meals",
    specialRequests: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <div>
          <Label className="mb-1" htmlFor="city">
            City
          </Label>
          <Input
            id="city"
            value={formData.city}
            placeholder="Enter the city"
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            required
          />
        </div>

        <div>
          <Label className="mb-1" htmlFor="preferredHotel">
            Preferred Hotel
          </Label>
          <Input
            id="preferredHotel"
            value={formData.preferredHotel}
            placeholder="Preferred hotels, separated by comma if multiple"
            onChange={(e) =>
              setFormData({ ...formData, preferredHotel: e.target.value })
            }
            required
          />
        </div>

        <div>
          <Label className="mb-1" htmlFor="location">
            Preferred Location
          </Label>
          <Input
            id="location"
            value={formData.preferredLocation}
            placeholder="City center, seaside area, etc."
            onChange={(e) =>
              setFormData({ ...formData, preferredLocation: e.target.value })
            }
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              // htmlFor="check-in"
              className="block text-sm font-medium mb-1"
            >
              Check-in
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full">
                  {format(new Date(formData.checkIn), "PPP")}
                  <CalendarIcon className="ml-2 h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={new Date(formData.checkIn)}
                  onSelect={(date) =>
                    setFormData({ ...formData, checkIn: date })
                  }
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <label
              // htmlFor="check-out"
              className="block text-sm font-medium mb-1"
            >
              Check-out
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full">
                  {format(new Date(formData.checkOut), "PPP")}
                  <CalendarIcon className="ml-2 h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={new Date(formData.checkOut)}
                  onSelect={(date) =>
                    setFormData({ ...formData, checkOut: date })
                  }
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="star-rating grid grid-cols-2 gap-4">
          <div className="">
            <Label htmlFor="rating" className="block text-sm font-medium mb-1">
              Star Rating
            </Label>
            <Input
              type="number"
              name="rating"
              id="rating"
              min={1}
              max={5}
              value={formData.starRating}
              onChange={(e) =>
                setFormData({ ...formData, starRating: e.target.value })
              }
            />
          </div>
          <div className="">
            <Label htmlFor="rooms" className="block text-sm font-medium mb-1">
              Rooms
            </Label>
            <Input
              type="number"
              name="rooms"
              id="rooms"
              min={1}
              value={formData.rooms}
              onChange={(e) =>
                setFormData({ ...formData, rooms: e.target.value })
              }
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="room-type">
            <Label htmlFor="room-type" className="mb-1">
              Room Type
            </Label>
            <Select
              name="room-type"
              id="room-type"
              // defaultValue="single"
              onChange={(value) =>
                setFormData({ ...formData, roomType: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Room Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">Single</SelectItem>
                <SelectItem value="double">Double</SelectItem>
                <SelectItem value="family">Family</SelectItem>
                <SelectItem value="suite">Suite</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="meals">
            <Label htmlFor="meals" className="mb-1">
              Meals
            </Label>
            <Select
              name="meals"
              id="meals"
              onChange={(value) => setFormData({ ...formData, meals: value })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Meals" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="breakfast-only">Breakfast only</SelectItem>
                <SelectItem value="half-board">Half board</SelectItem>
                <SelectItem value="full-board">Full board</SelectItem>
                <SelectItem value="all-meals">All inclusive</SelectItem>
                <SelectItem value="no-meals">No meals</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label className="mb-1">Special Requests</Label>
          <Input
            value={formData.specialRequests}
            placeholder="Child play area, wheelchair access, etc."
            onChange={(e) =>
              setFormData({ ...formData, specialRequests: e.target.value })
            }
          />
        </div>

        <div className="flex justify-between">
          <Button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Request Hotel"}
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/dashboard/trips/${trip.id}`}>Back</Link>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default HotelReservationForm;
