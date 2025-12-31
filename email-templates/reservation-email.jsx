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

const ReservationEmail = ({ fullname, details, type }) => {
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
              <Container className="dark:bg-slate-800 dark:text-gray-50 bg-gray-50 p-6 rounded-lg">
                <Container className="m-6">
                  <Text className="mb-5">
                    {type.charAt(0).toUpperCase() + type.slice(1)} Reservation
                    Submitted Successfully
                  </Text>
                  {Object.entries(details).map(([key, value]) => (
                    <Text key={key} className="mb-2">
                      <strong>
                        {key.charAt(0).toUpperCase() + key.slice(1)}:
                      </strong>{" "}
                      {(() => {
                        if (!value) return "N/A";
                        if (value instanceof Date)
                          return value.toLocaleDateString();
                        if (typeof value === "object") {
                          // Handle rooms specifically or general objects
                          if (key === "rooms") {
                            return Object.entries(value).map(
                              ([roomType, details]) => {
                                if (!details.count) return null;
                                return (
                                  <div key={roomType} className="ml-4 mt-1">
                                    • {roomType}: {details.count} (
                                    {details.meals})
                                  </div>
                                );
                              }
                            );
                          }
                          return JSON.stringify(value, null, 2);
                        }
                        if (typeof value === "boolean")
                          return value ? "Yes" : "No";
                        return value;
                      })()}
                    </Text>
                  ))}
                </Container>
              </Container>
              <Text className="mb-4">
                You can view your request details and itinerary by clicking the
                button below:
              </Text>
              <Container className="text-center my-8">
                <Button
                  target="_blank"
                  href="https://virstravelclub.com/dashboard/"
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50"
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

export default ReservationEmail;
