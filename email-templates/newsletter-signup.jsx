import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

export const NewsletterSignupEmail = () => {
  return (
    <Html>
      <Head />
      <Preview>Welcome to the Virstravel Newsletter!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Welcome to Virstravel Updates!</Heading>

          <Section style={bodySection}>
            <Text style={text}>
              Hi there,
            </Text>
            <Text style={text}>
              Thank you for subscribing to the Virstravel newsletter! You are now on the list to receive our latest updates, exclusive deals, and travel inspiration.
            </Text>
            <Text style={text}>
              We'll be in touch soon with some amazing offers.
            </Text>
            <Text style={text}>
              Best regards,<br />
              The Virstravel Team
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default NewsletterSignupEmail;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  padding: "0 48px",
  margin: "30px 0",
};

const bodySection = {
  padding: "0 48px",
};

const text = {
  color: "#525f7f",
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left",
};
