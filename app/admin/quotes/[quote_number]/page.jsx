import NavSummary from "@/components/NavSummary";

const QuoteDetailPage = async ({ params }) => {
  const { quote_number } = await params;
  const pathname = `/admin/quotes/${quote_number}`;
  return (
    <div className="p-4 md:p-8">
      <NavSummary pathname={pathname} />
      <h1>Quote Detail Page</h1>
      <h2>Quote Number: {quote_number}</h2>
    </div>
  );
};

export default QuoteDetailPage;
