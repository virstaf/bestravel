import { getReservation } from "@/actions/reservations";

const ReservationsPage = async ({ params }) => {
  const { res_id } = await params;
  const reservation = await getReservation(res_id);
  return (
    <div>
      reservation detail page: {res_id}
      <pre>{JSON.stringify(reservation, null, 2)}</pre>
    </div>
  );
};

export default ReservationsPage;
