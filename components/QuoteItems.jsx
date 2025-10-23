const QuoteItems = (
  customer,
  quote,
  quote_number,
  dateIssued,
  validUntil,
  flightQuotes,
  hotelQuotes,
  transferQuotes
) => {
  return (
    <div
      className="card p-8 my-4 max-w-5xl mx-auto bg-white shadow rounded-md tracking-wide"
      id="full_quote"
    >
      <div className="header grid my-6 grid-cols-1 lg:grid-cols-3 space-y-4 ">
        <div className="customer-info">
          {/* <h2>Customer Information</h2> */}
          <p>Name: {customer?.full_name}</p>
          <p>Email: {customer?.email}</p>
          <p>Phone: {customer?.phone || "N/A"}</p>
          <p>Subscription: {customer?.subscription_plan || "N/A"}</p>
        </div>
        <div className="quote-info">
          <p>Quotation No. : {quote_number}</p>
          <p>Date issued : {dateIssued}</p>
          <p>Valid until : {validUntil}</p>
        </div>
        <div className="quote-info">
          <h2>Quotation Details</h2>
          <p>Amount: ${quote?.total_amount}</p>
          <p>Status: {quote?.status}</p>
        </div>
      </div>
      <div className="items space-y-4">
        {flightQuotes?.length > 0 && (
          <div className="flight space-y-4 p-4 border-l-4 border-1 border-green-200 shadow rounded-2xl">
            <h3>Flight Options</h3>
            <div className="space-y-2">
              {flightQuotes.map((item, index) => (
                <FlightQuoteItem key={index} quote={item} />
              ))}
            </div>
          </div>
        )}
        {hotelQuotes?.length > 0 && (
          <div className="hotels space-y-4 p-4 border-l-4 border-1 border-red-200 shadow rounded-2xl">
            <h3>Hotel Options</h3>
            <div className="space-y-2">
              {hotelQuotes.map((item, index) => (
                <HotelQuoteItem key={index} quote={item} />
              ))}
            </div>
          </div>
        )}
        {transferQuotes?.length > 0 && (
          <div className="hotels space-y-4 p-4 border-l-4 border-1 border-blue-200 shadow rounded-2xl">
            <h3>Transfer Options</h3>
            <div className="space-y-2">
              {transferQuotes.map((item, index) => (
                <TransferQuoteItem key={index} quote={item} />
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="terms py-6 space-y-2">
        <h2 className="font-semibold">Terms & Conditions</h2>

        <p>
          Quotation valid for{" "}
          <span className="text-primary font-mono tracking-tighter font-semibold">
            7 days
          </span>{" "}
          from issue date. <br />
          Subject to availability at the time of booking. <br />
          Cancellation & refund policy applies as per Virstravel Club booking
          terms.
        </p>
        <h2 className="font-semibold">Contact Us</h2>
        <p>📧 bookings@virstravelclub.com</p>
      </div>
    </div>
  );
};

export default QuoteItems;

const FlightQuoteItem = ({
  quote: { category, supplier, price, quantity },
}) => (
  <div className="px-6 py-4 bg-white shadow rounded flex gap-6">
    <p>{category[0].toUpperCase() + category.slice(1)}</p>
    <p>{supplier}</p>
    <p>{`$${price} x ${quantity} travellers`}</p>
  </div>
);

const HotelQuoteItem = ({ quote: { category, supplier, price, quantity } }) => (
  <div className="px-6 py-4 bg-white shadow rounded flex gap-6 ">
    <p>{category[0].toUpperCase() + category.slice(1) + " Room"}</p>
    <p>{supplier}</p>
    <p>{`$${price} x ${quantity} nights`}</p>
  </div>
);

const TransferQuoteItem = ({
  quote: { category, supplier, price, quantity },
}) => (
  <div className="px-6 py-4 bg-white shadow rounded flex gap-6">
    <p>{category[0].toUpperCase() + category.slice(1)}</p>
    <p>{supplier}</p>
    <p>{`$${price} x ${quantity} ways`}</p>
  </div>
);
