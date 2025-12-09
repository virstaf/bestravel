import {
  Html,
  Body,
  Container,
  Heading,
  Head,
  Text,
  Img,
  Tailwind,
  Button,
} from "@react-email/components";

const QuoteNotificationEmail = ({ fullname, quoteDetails }) => {
  const {
    quoteNumber,
    tripName,
    totalAmount,
    validUntil,
    clientNotes,
    dashboardLink,
  } = quoteDetails;

  return (
    <Html>
      <Tailwind>
        <Head />
        <Body className="bg-gray-100 text-gray-900 mx-auto font-sans my-12">
          <Container className="p-45 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
            <Container className="mx-auto mt-12 mb-12">
              <Img
                src="https://ylpkcsmbsnowmbyxhbzw.supabase.co/storage/v1/object/public/static//virstravel.png"
                width="184"
                height="75"
                alt="Virstravel"
                className="mx-auto my-6"
              />
              <Heading className="text-2xl font-bold">
                Hi {fullname} 👋,
              </Heading>
              <Text className="mb-4 text-lg">
                Great news! Your quote is ready for review.
              </Text>
              <Container className="dark:bg-slate-800 dark:text-gray-50 bg-gray-50 p-6 rounded-lg">
                <Container className="m-6">
                  <Text className="mb-5 text-xl font-semibold">
                    Quote Details
                  </Text>
                  <Text className="mb-2">
                    <strong>Quote Number:</strong> {quoteNumber}
                  </Text>
                  <Text className="mb-2">
                    <strong>Trip:</strong> {tripName}
                  </Text>
                  <Text className="mb-2">
                    <strong>Total Amount:</strong> £
                    {totalAmount?.toFixed(2) || "0.00"}
                  </Text>
                  {validUntil && (
                    <Text className="mb-2">
                      <strong>Valid Until:</strong>{" "}
                      {new Date(validUntil).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </Text>
                  )}
                  {clientNotes && (
                    <>
                      <Text className="mb-2 mt-4">
                        <strong>Notes from your travel advisor:</strong>
                      </Text>
                      <Text className="mb-2 whitespace-pre-wrap">
                        {clientNotes}
                      </Text>
                    </>
                  )}
                </Container>
              </Container>
              <Text className="mb-4 mt-6">
                You can view your complete quote details and itinerary by
                clicking the button below:
              </Text>
              <Container className="text-center my-8">
                <Button
                  target="_blank"
                  href={dashboardLink}
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                  View Quote in Dashboard
                </Button>
              </Container>
              <Text className="mb-4">
                If you have any questions about this quote, please don't
                hesitate to reach out to us.
              </Text>
              <Text className="mb-4">
                Best regards,
                <br />
                The Virstravel Club Team
              </Text>
            </Container>

            <Text className="mb-45 text-center text-gray-400">
              Chantry House, IncuHive Space, 38 The Chantry, Andover, SP10 1LZ.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default QuoteNotificationEmail;
