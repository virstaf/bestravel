import { getReservation } from "@/actions/admin/reservation";
import { getUserById } from "@/actions/admin/users";
import {
  FlightDetailCard,
  HotelDetailCard,
  ReservationCard,
  TransferDetailCard,
} from "@/components/admin/ReservationCard";
import { UserCard } from "@/components/admin/UserCard";
import NavSummary from "@/components/NavSummary";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ReservationDetailPage = async ({ params }) => {
  const { ref_id } = await params;
  const refId = ref_id.split("REQ-00")[1];
  const data = await getReservation(refId);
  const userId = data?.user_id;
  const user = await getUserById(userId);
  const pathname = `/admin/reservations/${ref_id}`;

  const reducedData = {
    status: data?.status,
    full_name: data?.user?.name,
    trip_name: data?.trip?.name,
    dates: [data?.start_date, data?.end_date],
    type: data?.type,
    details: data?.details,
  };

  return (
    <div className="p-4 md:p-8">
      <NavSummary pathname={pathname} />
      <div className="grid grid-cols-1 lg:grid-cols-[460px_1fr] gap-4 ">
        <div className="">{user && <UserCard user={user} />}</div>
        <div>
          <ReservationCard reservation={reducedData} />
        </div>

        {reducedData.type === "hotel" && (
          <div className="mt-8">
            <HotelDetailCard hotel={reducedData.details} />
            <div className="grid grid-cols-2 gap-2 mt-4">
              <Button asChild variant="outline">
                <Link
                  href={`/admin/hotels/search?location=${reducedData.details.city}`}
                >
                  Search Hotel
                </Link>
              </Button>
              <Button className="">Generate Quote</Button>
            </div>
          </div>
        )}
        {reducedData.type === "flight" && (
          <div className="mt-8">
            <FlightDetailCard flight={reducedData.details} />
            <div className="flex gap-2 mt-4">
              <Button>Search Flight</Button>
              <Button className="" variant="secondary">
                View Flight Options
              </Button>
            </div>
          </div>
        )}
        {reducedData.type === "transfer" && (
          <div className="mt-8">
            <TransferDetailCard transfer={reducedData.details} />
            <div className="flex gap-2 mt-4">
              <Button>Search Transfer</Button>
              <Button className="" variant="secondary">
                View Transfer Options
              </Button>
            </div>
          </div>
        )}

        {/* <pre className="mt-20">{JSON.stringify(reducedData, null, 2)}</pre> */}
        {/* <pre className="mt-20">{JSON.stringify(data, null, 2)}</pre> */}
      </div>
    </div>
  );
};

export default ReservationDetailPage;
