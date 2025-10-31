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

export default function ReservationWizard({ trip, userId }) {
  const [activeTab, setActiveTab] = useState("hotel");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (type, details) => {
    // const user = await getUser();
    setLoading(true);
    const adminType = "admin-" + type;

    try {
      // const { success: emailAdminSuccess, message: adminMessage } =
      //   await resendEmail(
      //     {
      //       email: "info@virstravelclub.com",
      //       details,
      //       type,
      //       user: {
      //         fullname: user.user_metadata.full_name,
      //         email: user.email,
      //         userId: user.id,
      //       },
      //     },
      //     adminType
      //   );

      // const { success: emailMemberSuccess, message: memberMessage } =
      //   await resendEmail(
      //     {
      //       fullname: user.user_metadata.full_name || user.email.split("@")[0],
      //       email: user.email,
      //       details,
      //       type,
      //     },
      //     type
      //   );

      // if (!emailAdminSuccess) throw adminMessage;
      // if (!emailMemberSuccess) throw memberMessage;

      // console.log("admin msg:", adminMessage, "admin msg:", memberMessage);

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

      router.refresh();
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
