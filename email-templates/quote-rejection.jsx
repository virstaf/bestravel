import {
  Html,
  Body,
  Container,
  Heading,
  Head,
  Text,
  Img,
  Tailwind,
} from "@react-email/components";

const QuoteRejectionEmail = ({ fullname, quoteDetails }) => {
  const { quoteNumber, tripName } = quoteDetails;

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
                We've received your response regarding quote #{quoteNumber} for
                your {tripName} trip.
              </Text>
              <Container className="dark:bg-slate-800 dark:text-gray-50 bg-orange-50 p-6 rounded-lg border-2 border-orange-200">
                <Container className="m-6">
                  <Text className="mb-5 text-xl font-semibold text-orange-800">
                    Quote Declined
                  </Text>
                  <Text className="mb-2">
                    We understand that this quote may not have met your
                    expectations.
                  </Text>
                </Container>
              </Container>
              <Text className="mb-4 mt-6">
                <strong>What would you like to do next?</strong>
              </Text>
              <Text className="mb-2">
                • Request a revised quote with different options
              </Text>
              <Text className="mb-2">
                • Discuss alternative travel arrangements
              </Text>
              <Text className="mb-2">
                • Speak with one of our travel advisors
              </Text>
              <Text className="mb-4 mt-6">
                Our team is here to help you find the perfect travel solution.
                Please reply to this email or contact us to discuss your
                preferences.
              </Text>
              <Text className="mb-4">
                We look forward to helping you plan your perfect trip!
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

export default QuoteRejectionEmail;
