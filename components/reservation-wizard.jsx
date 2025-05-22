"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HotelReservationForm from "./hotel-reservation-form";
import TransferReservationForm from "./transfer-reservation-form";
import FlightReservationForm from "./flight-reservation-form";

export default function ReservationWizard({ trip, userId }) {
  const [activeTab, setActiveTab] = useState("hotel");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (type, details) => {
    setLoading(true);
    try {
      // console.log("Submitting reservation:", type, details);
      const { error } = await supabase.from("reservations").insert({
        trip_id: trip.id,
        user_id: userId,
        type,
        details,
        start_date: trip.start_date,
        end_date: trip.end_date,
      });

      if (error) throw error;

      router.refresh();
    } catch (error) {
      // console.error("Reservation error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 pb-6 bg-white mx-auto max-w-[750px] rounded-lg shadow-md">
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
  );
}
