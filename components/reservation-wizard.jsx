"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HotelReservationForm from "./hotel-reservation-form";
import TransferReservationForm from "./transfer-reservation-form";
import FlightReservationForm from "./flight-reservation-form";
import { toast } from "sonner";
import { getUser } from "@/lib/supabase/server";
import { supabase } from "@/lib/supabase/client";
import { resendEmail } from "@/actions/resendEmail";
import TripSummaryCard from "./TripSummaryCard";
import { MapPin } from "lucide-react";
import { Calendar } from "lucide-react";
import { getFormattedDate } from "@/lib/getFormattedDate";

export default function ReservationWizard({ trip, userId }) {
  const [activeTab, setActiveTab] = useState("hotel");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (type, details) => {
    const user = await getUser();
    setLoading(true);
    const adminType = "admin-" + type;

    try {
      const { success: emailAdminSuccess, message: adminMessage } =
        await resendEmail(
          {
            email: "info@virstravelclub.com",
            details,
            user: {
              fullname: user.user_metadata.full_name,
              email: user.email,
              userId: user.id,
            },
          },
          adminType
        );

      const { success: emailMemberSuccess, message: memberMessage } =
        await resendEmail(
          {
            fullname: user.user_metadata.full_name || user.email.split("@")[0],
            email: user.email,
            details,
          },
          type
        );

      if (!emailAdminSuccess) console.log({
        message: adminMessage,
        type: "admin",
      });
      if (!emailMemberSuccess) console.log({
        message: memberMessage,
        type: "member",
      });

      console.log("admin msg:", adminMessage, "admin msg:", memberMessage);

      const { error: dbError } = await supabase.from("reservations").insert({
        trip_id: trip.id,
        user_id: userId,
        type,
        details,
        start_date: trip.start_date,
        end_date: trip.end_date,
      });

      if (dbError) throw dbError;

      toast.success(
        `${
          type.charAt(0).toUpperCase() + type.slice(1)
        } reservation submitted successfully!`
      );

      router.push("/dashboard/reservations");
    } catch (error) {
      console.error(
        `${type.charAt(0).toUpperCase() + type.slice(1)} reservation error:`,
        error
      );
      toast.error(
        `${type.charAt(0).toUpperCase() + type.slice(1)} reservation error: ${error}`
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
    </div></div>
  );
}

const TripSummary = ({ trip }) => {
  return (
    <div className="flex flex-col justify-between w-full my-6">
      <h2 className="text-xl font-semibold">{trip.title}</h2>
      <div className="flex items-center gap-2">
        <MapPin size={16}/>
        <p className="text-gray-600"><span className="font-semibold">{trip.destination}</span></p>
      </div>
      <div className="flex items-center gap-2">
        <Calendar size={16}/>
        <p className="text-gray-600"><span className="font-semibold">{getFormattedDate(trip.start_date)} - {getFormattedDate(trip.end_date)}</span></p>
      </div>
    </div>
  );
}