import {
  Html,
  Body,
  Container,
  Heading,
  Text,
  Img,
  Tailwind,
  Button,
} from "@react-email/components";

const ReservationConfirmationEmail = ({ fullname, link, type }) => {
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
                Wohooo! Your <span className="font-semibold">{type}</span>,
                reservation has been received.
              </Text>
              <Text className="mb-4">
                You can view your request details and itinerary by clicking the
                button below:
              </Text>
              <Container className="text-center my-8">
                <Button
                  target="_blank"
                  href={link}
                  className="bg-primary text-white px-6 py-3 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  View Reservation Details
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

export default ReservationConfirmationEmail;
