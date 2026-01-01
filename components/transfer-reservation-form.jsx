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

const TransferReservationForm = ({ trip, onSubmit, loading }) => {
  const [isReturnTransfer, setIsReturnTransfer] = useState(false);
  const [returnPickupDate, setReturnPickupDate] = useState(trip.end_date);
  const [formData, setFormData] = useState({
    transferType: "airport",
    pickupLocation: "",
    dropoffLocation: trip.destination.split(",")[0].trim(),
    pickupDate: trip.start_date,
    pickupTime: "12:00",
    returnTransfer: isReturnTransfer,
    returnPickupDate: returnPickupDate,
    returnPickupTime: "12:00",
    vehicleType: "sedan",
    passengers: 2,
    specialRequests: "",
  });

  const [pickupQuery, setPickupQuery] = useState("");
  const [shouldPickupSearch, setShouldPickupSearch] = useState(true);
  const [dropoffQuery, setDropoffQuery] = useState("");
  const [shouldDropoffSearch, setShouldDropoffSearch] = useState(true);

  const handleSubmit = async () => {
    // e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form action={handleSubmit} className="space-y-4 mt-4">
      <div>
        <Label className="mb-1">Transfer Type</Label>
        <Select
          value={formData.transferType}
          onValueChange={(value) =>
            setFormData({ ...formData, transferType: value })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select transfer type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="airport">Airport Transfer</SelectItem>
            <SelectItem value="hotel">Hotel Transfer</SelectItem>
            <SelectItem value="city">City Transfer</SelectItem>
            <SelectItem value="cruise">Cruise Port Transfer</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="mb-1">Pickup Location</Label>
          <AddressInput
            placeholder={
              formData.transferType === "airport"
                ? "Airport code (e.g. JFK)"
                : "Address or location"
            }
            onChange={(value) =>
              setFormData({ ...formData, pickupLocation: value })
            }
          />
        </div>

        <div>
          <Label className="mb-1">Dropoff Location</Label>
          <AddressInput
            placeholder="Enter dropoff location..."
            value={formData.dropoffLocation}
            onChange={(value) =>
              setFormData({ ...formData, dropoffLocation: value })
            }
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="mb-1">Pickup Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full">
                {format(new Date(formData.pickupDate), "PPP")}
                <CalendarIcon className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={new Date(formData.pickupDate)}
                onSelect={(date) =>
                  setFormData({ ...formData, pickupDate: date })
                }
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <Label className="mb-1">Pickup Time</Label>
          <Input
            type="time"
            value={formData.pickupTime}
            onChange={(e) =>
              setFormData({ ...formData, pickupTime: e.target.value })
            }
            required
          />
        </div>
      </div>

      <div className="flex flex-col">
        <Label className="mb-1">Request Return Transfer?</Label>
        <div className="flex">
          <input
            type="checkbox"
            checked={isReturnTransfer}
            onChange={(e) => {
              setIsReturnTransfer(e.target.checked);
              setFormData({
                ...formData,
                returnTransfer: e.target.checked,
                returnPickupDate: e.target.checked ? returnPickupDate : null,
                returnPickupTime: e.target.checked ? "12:00" : null,
              });
            }}
          />
          <p className="text-sm text-gray-500 ml-2">
            Check this box if you want to book a return transfer.
          </p>
        </div>
      </div>

      {isReturnTransfer && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="mb-1">Return Pickup Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full">
                  {format(new Date(formData.returnPickupDate), "PPP")}
                  <CalendarIcon className="ml-2 h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={new Date(formData.returnPickupDate)}
                  onSelect={(date) =>
                    setFormData({ ...formData, returnPickupDate: date })
                  }
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label className="mb-1">Return Time</Label>
            <Input
              type="time"
              value={formData.returnPickupTime}
              onChange={(e) =>
                setFormData({ ...formData, returnPickupTime: e.target.value })
              }
              required
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="mb-1">Vehicle Type</Label>
          <Select
            value={formData.vehicleType}
            onValueChange={(value) =>
              setFormData({ ...formData, vehicleType: value })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select vehicle" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sedan">Sedan (1-3 passengers)</SelectItem>
              <SelectItem value="suv">SUV (1-5 passengers)</SelectItem>
              <SelectItem value="mini-bus">
                Mini Bus (1-8 passengers)
              </SelectItem>
              <SelectItem value="luxury">Luxury Vehicle</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="mb-1">Passengers</Label>
          <Input
            type="number"
            min="1"
            max="8"
            value={formData.passengers}
            onChange={(e) =>
              setFormData({ ...formData, passengers: e.target.value })
            }
          />
        </div>
      </div>

      <div>
        <Label className="mb-1">Special Requests</Label>
        <Input
          value={formData.specialRequests}
          placeholder="Child seats, wheelchair access, etc."
          onChange={(e) =>
            setFormData({ ...formData, specialRequests: e.target.value })
          }
        />
      </div>

      <div className="flex justify-between">
        <Button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Request Transfer"}
        </Button>
        <Button variant="outline" asChild>
          <Link href={`/dashboard/trips/${trip.id}`}>Back</Link>
        </Button>
      </div>
    </form>
  );
};

export default TransferReservationForm;
