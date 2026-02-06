import {
  Html,
  Body,
  Container,
  Heading,
  Text,
  Img,
  Tailwind,
  Section,
} from "@react-email/components";

const DealRequestConfirmationEmail = ({ fullname, from, to, dates }) => {
  return (
    <Html>
      <Tailwind>
        <Body className="bg-gray-100 text-gray-900 mx-auto font-sans my-12">
          <Container className="p-8 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
            <Container className="mx-auto mt-8 mb-8">
              <Img
                src="https://ylpkcsmbsnowmbyxhbzw.supabase.co/storage/v1/object/public/static//virstravel.png"
                width="150"
                height="60"
                alt="Virstravel"
                className="mx-auto my-6"
              />
              <Heading className="text-2xl font-bold text-center mb-6">
                🎉 Request received!
              </Heading>

              <Text className="text-lg text-center mb-6">
                We’re currently searching for the best deals for your trip from{" "}
                <strong>
                  {from} → {to}
                </strong>{" "}
                ({dates}).
              </Text>

              <Section className="bg-blue-50 p-6 rounded-lg mb-6">
                <Heading className="text-lg font-bold mb-4">
                  What happens next:
                </Heading>
                <Text className="mb-2">
                  ✓ Our team compares multiple providers
                </Text>
                <Text className="mb-2">
                  ✓ We negotiate the best available rates
                </Text>
                <Text className="mb-0">
                  ✓ You’ll receive your personalized quotes shortly
                </Text>
              </Section>

              <Text className="text-center text-muted-foreground font-medium">
                ⏱ Typical response time: within 24 hours
              </Text>

              <Text className="mt-8 text-center text-sm text-gray-500">
                You can view the status of your requests in your dashboard.
              </Text>
            </Container>

            <Text className="mb-45 text-center text-gray-400 text-xs">
              Chantry House, IncuHive Space, 38 The Chantry, Andover, SP10 1LZ.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default DealRequestConfirmationEmail;
