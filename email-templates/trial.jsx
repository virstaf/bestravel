import {
  Html,
  Body,
  Button,
  Container,
  Heading,
  Text,
  Img,
  Tailwind,
} from "@react-email/components";

const TrialConfirmationEmail = ({ fullname, trialEndsAt }) => {
  return (
    <Html>
      <Tailwind>
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
              <Text className="mb-4">
                Wohooo! Your trial starts now. You can enjoy all the benefits of
                our Silver Plan.
              </Text>
              <Text className="mb-4">
                Your trial ends on {new Date(trialEndsAt).toLocaleDateString()}.
              </Text>
              <Container className="text-center my-8">
                <Button
                  href="https://virstravelclub.com/dashboard/deals"
                  className="bg-primary text-white px-6 py-3 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 hover:scale-105 transition-transform"
                >
                  Explore Deals
                </Button>
              </Container>
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

export default TrialConfirmationEmail;
