"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HotelReservationForm from "./hotel-reservation-form";
import TransferReservationForm from "./transfer-reservation-form";
import FlightReservationForm from "./flight-reservation-form";
import { toast } from "sonner";
import { MapPin, Calendar } from "lucide-react";
import { getFormattedDate } from "@/lib/getFormattedDate";
import { resendEmail } from "@/actions/resendEmail";

export default function ReservationWizard({ trip, user }) {
  const [activeTab, setActiveTab] = useState("hotel");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (type, details) => {
    setLoading(true);

    try {
      // Get authenticated user
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();
      if (!authUser) throw new Error("Not authenticated");

      // Insert reservation into database
      const { error: insertError } = await supabase
        .from("reservations")
        .insert({
          trip_id: trip.id,
          user_id: authUser.id,
          type,
          details,
          start_date: trip.start_date,
          end_date: trip.end_date,
          status: "pending",
        });

      if (insertError) {
        toast.error("Error creating reservation. Please try again.");
        throw insertError;
      }

      toast.success(
        `${
          type.charAt(0).toUpperCase() + type.slice(1)
        } reservation submitted successfully!`
      );

      // Send email notification
      const sendNotification = await resendEmail(
        {
          fullname:
            authUser.user_metadata.full_name || authUser.email.split("@")[0],
          email: authUser.email,
          details,
          tripName: trip.title,
        },
        type
      );

      if (!sendNotification.success) {
        console.error(
          "Error sending confirmation email:",
          sendNotification.message
        );
      }

      router.push("/dashboard/reservations");
    } catch (err) {
      console.error(
        `${type.charAt(0).toUpperCase() + type.slice(1)} reservation error:`,
        err
      );
      toast.error(
        `${type.charAt(0).toUpperCase() + type.slice(1)} reservation error: ${
          err.message || "Unknown error"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[750px]">
      <TripSummary trip={trip} />
      <div className="p-4 pb-6 bg-white rounded-lg shadow-md">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="hotel">Hotel</TabsTrigger>
            <TabsTrigger value="flight">Flight</TabsTrigger>
            <TabsTrigger value="transfer">Transfer</TabsTrigger>
          </TabsList>

          <TabsContent value="hotel">
            <HotelReservationForm
              trip={trip}
              onSubmit={(data) => handleSubmit("hotel", data)}
              loading={loading}
            />
          </TabsContent>

          <TabsContent value="flight">
            <FlightReservationForm
              trip={trip}
              onSubmit={(data) => handleSubmit("flight", data)}
              loading={loading}
            />
          </TabsContent>

          <TabsContent value="transfer">
            <TransferReservationForm
              trip={trip}
              onSubmit={(data) => handleSubmit("transfer", data)}
              loading={loading}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

const TripSummary = ({ trip }) => {
  return (
    <div className="flex flex-col justify-between w-full my-6">
      <h2 className="text-xl font-semibold">{trip.title}</h2>
      <div className="flex items-center gap-2">
        <MapPin size={16} />
        <p className="text-gray-600">
          <span className="font-semibold">{trip.destination}</span>
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Calendar size={16} />
        <p className="text-gray-600">
          <span className="font-semibold">
            {getFormattedDate(trip.start_date)} -{" "}
            {getFormattedDate(trip.end_date)}
          </span>
        </p>
      </div>
    </div>
  );
};
