import { getQuoteById, getQuoteItems } from "@/actions/admin/quotes";
import { getTripById } from "@/actions/admin/trips";
import { getUserById } from "@/actions/admin/users";
import NavSummary from "@/components/NavSummary";
import Status from "@/components/ui/status";
import { getFormattedDate } from "@/lib/getFormattedDate";

const QuoteDetailPage = async ({ params }) => {
  const { quote_number } = await params;
  const pathname = `/admin/quotes/${quote_number}`;
  const { data: quote } = await getQuoteById(quote_number);
  const trip = await getTripById(quote.trip_id);
  const customer = await getUserById(trip.user_id);
  const { data: quoteItems } = await getQuoteItems(quote.id);

  const dateIssued = getFormattedDate(quote.created_at);
  const validUntil = quote.valid_until
    ? getFormattedDate(quote.valid_until)
    : "N/A";

  return (
    <div className="p-4 md:p-8">
      <NavSummary pathname={pathname} />
      <div className="my-4 w-full flex justify-between items-center">
        <h1>{trip.title}</h1>
        <Status value={trip.status} />
      </div>
      <div className="card p-8 my-4 bg-white shadow rounded-md tracking-wide">
        <div className="header">
          <p>Quotation No. : {quote_number}</p>
          <p>Date issued : {dateIssued}</p>
          <p>Valid until : {validUntil}</p>
        </div>
        <div className="customer-info my-4">
          <h2>Customer Information</h2>
          <p>Name: {customer.full_name}</p>
          <p>Email: {customer.email}</p>
          <p>Phone: {customer.phone || "N/A"}</p>
          <p>Subscription: {customer.subscription_plan || "N/A"}</p>
        </div>
        <div className="quote-info my-4">
          <h2>Quotation Details</h2>
          <p>Amount: ${quote.total_amount}</p>
          <p>Status: {quote.status}</p>
        </div>
      </div>
      {/* <pre>{JSON.stringify(quote, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(quoteItems, null, 2)}</pre> */}
    </div>
  );
};

export default QuoteDetailPage;
