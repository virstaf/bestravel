import react from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Heading,
  Button,
  Text,
  Img,
  Tailwind,
} from "@react-email/components";

let logoSrc;

const baseUrl = process.env.NEXT_PUBLIC_BASEURL
  ? `https://${process.env.NEXT_PUBLIC_BASEURL}`
  : "";

if (baseUrl && !baseUrl.startsWith("https://")) {
  logoSrc = `${baseUrl}/static/virstravel.png`;
} else {
  logoSrc = `/virstravel.png`;
}

const WelcomeEmail = ({ fullname, membershipId }) => {
  return (
    <Html>
      <Tailwind>
        <Head />
        <Body className="bg-gray-50 max-w-7xl mx-auto text-gray-800 font-sans">
          <Container className="bg-white max-w-2xl mx-auto my-8 shadow-md rounded-lg overflow-hidden">
            {/* Hero Banner */}
            <Container className="w-full h-15 px-30 my-8 mx-auto">
              <Img
                src="https://drive.usercontent.google.com/download?id=1b7OpxCqizKN66SkcQ5kE6ec9MK9MJHlW&export=view&authuser=0"
                alt="Welcome to Virstravel"
                width="800"
                height="300"
                className="w-full object-cover rounded-t-lg"
                style={{ height: "200px", objectFit: "cover" }}
              />
            </Container>

            <Container className="w-full px-30 mx-auto py-6">
              <Heading className="text-2xl font-bold mb-4">
                Hi {fullname} 👋,
              </Heading>

              {/* Benefits List with Checkmarks */}
              <span className="mb-4">
                Pack your bags and get ready for unforgettable journeys! With
                Virstravel, you'll enjoy:
              </span>

              <ul className="list-none pl-0 mb-6 ml-6">
                <li className="flex items-start mb-2">
                  <span className="mr-2">✅</span>
                  <span>
                    <strong>Best-in-class flights</strong> - Smooth travels at
                    great prices
                  </span>
                </li>
                <li className="flex items-start mb-2">
                  <span className="mr-2">✅</span>
                  <span>
                    <strong>Breathtaking holiday spots</strong> - Discover dream
                    destinations
                  </span>
                </li>
                <li className="flex items-start mb-2">
                  <span className="mr-2">✅</span>
                  <span>
                    <strong>Romantic getaways</strong> - Perfect stays for
                    couples
                  </span>
                </li>
                <li className="flex items-start mb-2">
                  <span className="mr-2">✅</span>
                  <span>
                    <strong>Seamless business trips</strong> - Travel smart,
                    work easy
                  </span>
                </li>
                <li className="flex items-start mb-4">
                  <span className="mr-2">✅</span>
                  <span>
                    <strong>Hassle-free transfers</strong> - We've got you
                    covered
                  </span>
                </li>
              </ul>

              <span className="mb-6">
                ...and so much more! Your next adventure is just a click away.
              </span>

              <Text className="mb-8 font-medium">
                Your membership ID:{" "}
                <span className="bg-gray-100 px-2 py-1 rounded">
                  {membershipId}
                </span>
              </Text>

              {/* CTA Card */}
              <Container className="bg-blue-50 shadow-2xl my-12 rounded-2xl">
                <Container className="my-10 px-15 mx-auto">
                  <Heading className="text-xl text-center font-semibold mb-2 text-blue-800">
                    Unforgettable Travel Awaits
                  </Heading>
                  <Text className="mb-4 text-blue-700 text-center">
                    Discover Handpicked Destinations Where Every Trip Feels Like
                    A Five Star Experience
                  </Text>
                  <Container className="text-center">
                    <Button
                      href="#"
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700"
                    >
                      Start Exploring Now
                    </Button>
                  </Container>
                </Container>
              </Container>

              {/* Footer */}
              <Section className="border-t border-gray-200 pt-6">
                <Text className="mb-4">
                  Best regards,
                  <br />
                  <strong>The Virstravel Club Team</strong>
                </Text>

                <Container
                  className="flex flex-col sm:flex-row justify-between items-center"
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    position: "relative",
                    marginBottom: "20px",
                    // padding: "20px 0",
                  }}
                >
                  <Img
                    src="https://drive.google.com/file/d/1F9maBcRC_-WP5ZWOfP6B3xuN9mbn_Ffg/preview"
                    width="120"
                    height="50"
                    // width="640"
                    // height="480"
                    alt="Virstravel"
                    className="w-[120px] sm:mb-0"
                  />
                  <Container className="w-full max-w-[250px] text-wrap absolute bottom-0 right-0">
                    <Text className="text-sm text-gray-500 text-right">
                      Chantry House, IncuHive Space
                      <br />
                      38 The Chantry, Andover, SP10 1LZ
                    </Text>
                  </Container>
                </Container>
              </Section>
            </Container>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default WelcomeEmail;
