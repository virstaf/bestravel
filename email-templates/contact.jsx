import react from "react";
import {
  Html,
  Body,
  Container,
  Heading,
  Text,
  Img,
  Tailwind,
} from "@react-email/components";

const baseUrl = process.env.NEXT_PUBLIC_BASEURL
  ? `https://${process.env.NEXT_PUBLIC_BASEURL}`
  : "";

const ContactEmail = ({ fullname }) => {
  return (
    <Html>
      <Tailwind>
        <Body className="bg-gray-100 text-gray-900 mx-auto font-sans my-12">
          <Container className="p-45 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
            <Container className="mx-auto mt-12 mb-12">
              <Img
                src={`/virstravel.png`}
                width="184"
                height="75"
                alt="Virstravel"
                className="mx-auto my-6"
              />
              <Heading className="text-2xl font-bold">
                Hi {fullname} 👋,
              </Heading>
              <Text className="mb-4">
                Thank you for reaching out to us! We have received your message
                and will get back to you shortly.
              </Text>
              <Text className="mb-4">
                Best regards,
                <br />
                The Virstravel Club Team
              </Text>
            </Container>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ContactEmail;
