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

const QuoteAdminNotificationEmail = ({ action, quoteDetails, userDetails }) => {
  const { quoteNumber, tripName, totalAmount } = quoteDetails;
  const { fullname, email } = userDetails;

  const isAcceptance = action === "accepted";
  const bgColor = isAcceptance ? "bg-green-50" : "bg-orange-50";
  const borderColor = isAcceptance ? "border-green-200" : "border-orange-200";
  const textColor = isAcceptance ? "text-green-800" : "text-orange-800";
  const emoji = isAcceptance ? "✅" : "❌";
  const actionText = isAcceptance ? "Accepted" : "Rejected";

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
                Quote {actionText} - Admin Notification
              </Heading>
              <Text className="mb-4 text-lg">
                A client has {isAcceptance ? "accepted" : "declined"} their
                quote.
              </Text>
              <Container
                className={`dark:bg-slate-800 dark:text-gray-50 ${bgColor} p-6 rounded-lg border-2 ${borderColor}`}
              >
                <Container className="m-6">
                  <Text className={`mb-5 text-xl font-semibold ${textColor}`}>
                    {emoji} Quote {actionText}
                  </Text>
                  <Text className="mb-2">
                    <strong>Quote Number:</strong> {quoteNumber}
                  </Text>
                  <Text className="mb-2">
                    <strong>Trip:</strong> {tripName}
                  </Text>
                  <Text className="mb-2">
                    <strong>Client:</strong> {fullname}
                  </Text>
                  <Text className="mb-2">
                    <strong>Email:</strong> {email}
                  </Text>
                  {totalAmount && (
                    <Text className="mb-2">
                      <strong>Total Amount:</strong> £
                      {totalAmount?.toFixed(2) || "0.00"}
                    </Text>
                  )}
                </Container>
              </Container>

              {isAcceptance ? (
                <>
                  <Text className="mb-4 mt-6">
                    <strong>Next Steps:</strong>
                  </Text>
                  <Text className="mb-2">
                    1. Process the booking and confirm all reservations
                  </Text>
                  <Text className="mb-2">
                    2. Send payment link to the client
                  </Text>
                  <Text className="mb-2">
                    3. Coordinate with suppliers for confirmations
                  </Text>
                </>
              ) : (
                <>
                  <Text className="mb-4 mt-6">
                    <strong>Recommended Actions:</strong>
                  </Text>
                  <Text className="mb-2">
                    • Follow up with the client to understand their concerns
                  </Text>
                  <Text className="mb-2">
                    • Prepare a revised quote if needed
                  </Text>
                  <Text className="mb-2">• Discuss alternative options</Text>
                </>
              )}

              <Text className="mb-4 mt-6">
                View the full quote details in the admin dashboard.
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

export default QuoteAdminNotificationEmail;
