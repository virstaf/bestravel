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

const ReservationAdminEmail = ({ details, type, user }) => {
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
                {type.charAt(0).toUpperCase() + type.slice(1)} Reservation
                Received
              </Heading>
              <Text className="mb-4">Details: </Text>
              <Container className="dark:bg-slate-800 dark:text-gray-50 bg-gray-50 p-6 rounded-lg">
                <Container className="dark:bg-slate-800 dark:text-gray-50 bg-gray-50 m-6 rounded-lg">
                  {Object.entries(user).map(([key, value]) => (
                    <Text key={key} className="mb-2">
                      <strong>
                        {key.charAt(0).toUpperCase() + key.slice(1)}:
                      </strong>{" "}
                      {value}
                    </Text>
                  ))}
                  {Object.entries(details).map(([key, value]) => (
                    <Text key={key} className="mb-2">
                      <strong>
                        {key.charAt(0).toUpperCase() + key.slice(1)}:
                      </strong>{" "}
                      {(() => {
                        if (!value) return "N/A";
                        if (typeof value === "object") {
                          // Handle rooms specifically
                          if (key === "rooms") {
                            return Object.entries(value)
                              .filter(([_, details]) => details.count > 0)
                              .map(
                                ([roomType, details]) =>
                                  `${roomType}: ${details.count} room(s), ${details.meals || "no meals"}`
                              )
                              .join("; ");
                          }
                          // Handle other objects
                          return JSON.stringify(value);
                        }
                        if (typeof value === "boolean")
                          return value ? "Yes" : "No";
                        return String(value);
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
                  href="https://virstravelclub.com/admin/"
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

export default ReservationAdminEmail;
