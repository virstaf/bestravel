import { getAllQuotes } from "@/actions/admin/quotes";
import { fetchAllTrips } from "@/actions/trips";
import QuotesTable from "@/components/admin/quotes-table";
import NavSummary from "@/components/NavSummary";

const AdminQuotesPage = async () => {
  const pathname = "/admin/quotes";
  const { data: quotes } = await getAllQuotes();
  const { data: trips } = await fetchAllTrips();

  const reducedQuotes = quotes.map((quote) => ({
    id: quote.id,
    quote_number: quote.quote_number,
    trip_name: trips.find((trip) => trip.id === quote.trip_id)?.title || "Unknown",
    total_amount: quote.total_amount,
    status: quote.status,
    valid_until: quote.valid_until || "N/A",
  }));

  return (
    <div className="p-4 md:p-8">
      <NavSummary pathname={pathname} />
      <h1 className="text-2xl font-bold text-muted-foreground hidden">
        All Quotes
      </h1>
      <h2 className="text-lg font-semibold text-gray-500 mb-4">
        View and Manage all Quotes
      </h2>
      <section>
        <QuotesTable quotes={reducedQuotes} title="All Quotes" />
      </section>
    </div>
  );
};

export default AdminQuotesPage;
