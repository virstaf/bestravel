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
import { Textarea } from "./ui/textarea";

const HotelReservationForm = ({ trip, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    hotelName: "",
    preferredLocation: "",
    checkIn: trip.start_date,
    checkOut: trip.end_date,
    rooms: 1,
    starRating: 3,
    bedType: "single",
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
          <Label className="mb-1">Hotel Name</Label>
          <Input
            value={formData.hotelName}
            placeholder="Preferred hotels, separated by comma if multiple"
            onChange={(e) =>
              setFormData({ ...formData, hotelName: e.target.value })
            }
            required
          />
        </div>

        <div>
          <Label className="mb-1">Preferred Location</Label>
          <Input
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
            <label className="block text-sm font-medium mb-1">Check-in</label>
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
            <label className="block text-sm font-medium mb-1">Check-out</label>
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
              min={1}
              value={formData.rooms}
              onChange={(e) =>
                setFormData({ ...formData, rooms: e.target.value })
              }
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bed">
            <Label htmlFor="bed" className="mb-1">
              Bed Type
            </Label>
            <Select
              onChange={(value) => setFormData({ ...formData, bedType: value })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Bed Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">Single</SelectItem>
                <SelectItem value="double">Double</SelectItem>
                <SelectItem value="suite">Suite</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="meals">
            <Label htmlFor="meals" className="mb-1">
              Meals
            </Label>
            <Select
              onChange={(value) => setFormData({ ...formData, meals: value })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Meals" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-meals">All Meals</SelectItem>
                <SelectItem value="breakfast">Breakfast only</SelectItem>
                <SelectItem value="dinner">Dinner only</SelectItem>
                <SelectItem value="none">No Meals</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="text-box">
          <Label htmlFor="special-requests" className="mb-1">
            Special Requests
          </Label>
          <Textarea
            id="special-requests"
            value={formData.specialRequests}
            onChange={(e) =>
              setFormData({ ...formData, specialRequests: e.target.value })
            }
          />
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? "Booking..." : "Reserve Hotel"}
        </Button>
      </form>
    </div>
  );
};

export default HotelReservationForm;
