// components/EditTripForm.js
"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

const EditTripForm = ({ trip }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: trip.title,
    destination: trip.destination,
    start_date: new Date(trip.start_date),
    end_date: new Date(trip.end_date),
    budget: trip.budget || "",
    adults: trip.adults || 1,
    children: trip.children || 0,
    description: trip.description || "",
    status: trip.status,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase
        .from("trips")
        .update({
          ...formData,
          start_date: formData.start_date.toISOString(),
          end_date: formData.end_date.toISOString(),
        })
        .eq("id", trip.id);

      if (error) throw error;

      router.push(`/dashboard/trips/${trip.id}`);
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-2xl bg-white p-6 rounded-2xl shadow-xl mb-6"
    >
      {error && (
        <div className="p-4 text-red-500 bg-red-50 rounded-md">{error}</div>
      )}

      <div>
        <Label className="mb-1" htmlFor="title">
          Trip Title
        </Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>

      <div>
        <Label className="mb-1" htmlFor="destination">
          Destination
        </Label>
        <Input
          id="destination"
          value={formData.destination}
          onChange={(e) =>
            setFormData({ ...formData, destination: e.target.value })
          }
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Start Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full">
                {format(formData.start_date, "PPP")}
                <CalendarIcon className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={formData.start_date}
                onSelect={(date) =>
                  setFormData({ ...formData, start_date: date })
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <Label>End Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full">
                {format(formData.end_date, "PPP")}
                <CalendarIcon className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={formData.end_date}
                onSelect={(date) =>
                  setFormData({ ...formData, end_date: date })
                }
                initialFocus
                fromDate={formData.start_date}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="mb-1" htmlFor="adults">
            Adults
          </Label>
          <Input
            id="adults"
            type="number"
            min="1"
            value={formData.adults}
            onChange={(e) =>
              setFormData({
                ...formData,
                adults: parseInt(e.target.value) || 0,
              })
            }
          />
        </div>
        <div>
          <Label className="mb-1" htmlFor="children">
            Children
          </Label>
          <Input
            id="children"
            type="number"
            min="0"
            value={formData.children}
            onChange={(e) =>
              setFormData({
                ...formData,
                children: parseInt(e.target.value) || 0,
              })
            }
          />
        </div>
      </div>

      <div>
        <Label className="mb-1" htmlFor="budget">
          Budget ($)
        </Label>
        <Input
          id="budget"
          type="number"
          min="0"
          value={formData.budget}
          onChange={(e) =>
            setFormData({
              ...formData,
              budget: parseFloat(e.target.value) || 0,
            })
          }
        />
      </div>

      <div>
        <Label className="mb-1" htmlFor="description">
          Description
        </Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          rows={4}
        />
      </div>

      <div className="flex gap-2">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </Button>
        <Button
          variant="outline"
          type="button"
          onClick={() => router.push(`/dashboard/trips/${trip.id}`)}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default EditTripForm;
