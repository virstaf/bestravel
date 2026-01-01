"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HotelReservationForm from "./hotel-reservation-form";
import TransferReservationForm from "./transfer-reservation-form";
import FlightReservationForm from "./flight-reservation-form";
import { toast } from "sonner";
import { submitReservation } from "@/actions/reservations";
import TripSummaryCard from "./TripSummaryCard";
import { MapPin } from "lucide-react";
import { Calendar } from "lucide-react";
import { getFormattedDate } from "@/lib/getFormattedDate";
import { testAction } from "@/actions/test";

export default function ReservationWizard({ trip, user }) {
  const [activeTab, setActiveTab] = useState("hotel");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (type, details) => {
    setLoading(true);

    console.log("type:: ", type);
    console.log("details:: ", details);

    try {
      const { success } = await testAction({
        name: "uniik",
        email: "uniiktheo@gmail.com",
      });
      if (!success) {
        throw new Error("error");
      }
      toast.success("success");
    } catch (err) {
      toast.error(err);
    }

    // try {
    //   const { success, message } = await submitReservation({
    //     type,
    //     details,
    //     tripId: trip.id,
    //     user,
    //   });

    //   if (message) console.log("message:::", message);

    //   if (!success) {
    //     throw new Error(message);
    //   }

    //   toast.success(
    //     `${
    //       type.charAt(0).toUpperCase() + type.slice(1)
    //     } reservation submitted successfully!`
    //   );

    //   router.push("/dashboard/reservations");
    // } catch (error) {
    //   console.error(
    //     `${type.charAt(0).toUpperCase() + type.slice(1)} reservation error:`,
    //     error
    //   );
    //   toast.error(
    //     `${type.charAt(0).toUpperCase() + type.slice(1)} reservation error: ${
    //       error.message || "Unknown error"
    //     }`
    //   );
    // } finally {
    //   setLoading(false);
    // }
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
