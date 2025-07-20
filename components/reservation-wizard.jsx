"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HotelReservationForm from "./hotel-reservation-form";
import TransferReservationForm from "./transfer-reservation-form";
import FlightReservationForm from "./flight-reservation-form";
import { toast } from "sonner";
import axios from "axios";
import { getUser } from "@/lib/supabase/server";
import { supabase } from "@/lib/supabase/client";
import { resendEmail } from "@/actions/resendEmail";

export default function ReservationWizard({ trip, userId }) {
  const [activeTab, setActiveTab] = useState("hotel");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (type, details) => {
    // console.log("reservation:::", trip, details);

    const user = await getUser();
    console.log(user);
    setLoading(true);
    try {
      // const { error } = await axios.post("/api/reservation", {
      //   trip_id: trip.id,
      //   user_id: user.userId,
      //   fullname: user.user_metadata.full_name || user.email.split("@")[0],
      //   type,
      //   details,
      //   start_date: trip.start_date,
      //   end_date: trip.end_date,
      //   email: user.email,
      // });

      // if (error) {
      //   toast.error("Error submitting reservation. Please try again.");
      //   throw error;
      // }

      const emailUser = await resendEmail(
        {
          fullname: user.user_metadata.full_name || user.email.split("@")[0],
          email: user.email,
          details,
          type,
        },
        type
      );

      const emailAdmin = await resendEmail(
        {
          email: "info@virstravelclub.com",
          details,
          type,
        },
        "admin-" + type
      );

      console.log("user:::", emailUser);
      console.log("admin:::", emailAdmin);

      const { dbError } = await supabase.from("reservations").insert({
        trip_id: trip.id,
        user_id: userId,
        type,
        details,
        start_date: trip.start_date,
        end_date: trip.end_date,
      });

      if (dbError) {
        console.error("db error:::", dbError);
      }

      toast.success(
        `${
          type.charAt(0).toUpperCase() + type.slice(1)
        } reservation submitted successfully!`
      );

      // const sendNotification = await resendEmail(
      //   {
      //     fullname: user.user_metadata.full_name || user.email.split("@")[0],
      //     link: `${process.env.NEXT_PUBLIC_BASEURL}/dashboard/reservations`,
      //     type: "confirm-reservation",
      //     email: user.email,
      //   },
      //   "confirm-reservation"
      // );

      if (!sendNotification.success) {
        console.error(
          "Error sending reservation confirmation email:",
          sendNotification.message
        );
      }

      router.refresh();
    } catch (error) {
      console.error(
        `${type.charAt(0).toUpperCase() + type.slice(1)} reservation error:`,
        error
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 pb-6 bg-white mx-auto w-full max-w-[750px] rounded-lg shadow-md">
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
