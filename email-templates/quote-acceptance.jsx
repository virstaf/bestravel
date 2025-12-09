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

const QuoteAcceptanceEmail = ({ fullname, quoteDetails }) => {
  const { quoteNumber, tripName, totalAmount, dashboardLink } = quoteDetails;

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
                Thank you for accepting your quote! We're excited to help make
                your trip memorable.
              </Text>
              <Container className="dark:bg-slate-800 dark:text-gray-50 bg-green-50 p-6 rounded-lg border-2 border-green-200">
                <Container className="m-6">
                  <Text className="mb-5 text-xl font-semibold text-green-800">
                    ✅ Quote Accepted
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
                </Container>
              </Container>
              <Text className="mb-4 mt-6">
                <strong>What happens next?</strong>
              </Text>
              <Text className="mb-2">
                1. Our team will process your booking and confirm all
                reservations
              </Text>
              <Text className="mb-2">
                2. You'll receive a payment link to secure your booking
              </Text>
              <Text className="mb-2">
                3. Once payment is confirmed, you'll receive detailed booking
                confirmations
              </Text>
              <Text className="mb-4 mt-6">
                You can track your booking status in your dashboard:
              </Text>
              <Container className="text-center my-8">
                <Button
                  target="_blank"
                  href={dashboardLink}
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                  View My Dashboard
                </Button>
              </Container>
              <Text className="mb-4">
                If you have any questions, please don't hesitate to contact us.
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

export default QuoteAcceptanceEmail;
