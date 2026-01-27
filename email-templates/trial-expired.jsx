import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

const TrialExpiredEmail = ({ fullname, link }) => {
  return (
    <Html>
      <Head />
      <Preview>
        Your Virstravel trial has expired - Come back and join us!
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Your Trial Has Expired ✈️</Heading>
          <Text style={text}>Hi {fullname},</Text>
          <Text style={text}>
            Your 7-day free trial of Virstravel Club has ended. We hope you
            enjoyed your sneak peek into the world of exclusive travel benefits!
          </Text>
          <Text style={text}>
            Your access to premium hotel discounts, eSIM data, and concierge
            services has been paused. But don't worry, you can get it all back
            in just a few clicks.
          </Text>

          <Section style={benefitsBox}>
            <Text style={benefitsTitle}>Unlock these benefits again:</Text>
            <Text style={benefitItem}>
              🛌 Exclusive Members-only Hotel Rates
            </Text>
            <Text style={benefitItem}>📱 Global eSIM Data on every trip</Text>
            <Text style={benefitItem}>💆 VIP Airport Lounge access</Text>
          </Section>

          <Text style={text}>
            Choose a plan that fits your travel style and continue your journey
            with Virstravel Club today.
          </Text>

          <Section style={buttonContainer}>
            <Button style={button} href={link}>
              Renew Membership
            </Button>
          </Section>

          <Text style={footerText}>
            Have questions about our plans? We're here to help!
          </Text>

          <Text style={footer}>
            Best regards,
            <br />
            The Virstravel Team
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default TrialExpiredEmail;

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
  margin: "40px 0",
  padding: "0 40px",
};

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "26px",
  padding: "0 40px",
};

const benefitsBox = {
  backgroundColor: "#f8f9fa",
  borderRadius: "8px",
  margin: "24px 40px",
  padding: "24px",
};

const benefitsTitle = {
  color: "#333",
  fontSize: "18px",
  fontWeight: "600",
  margin: "0 0 16px 0",
};

const benefitItem = {
  color: "#555",
  fontSize: "15px",
  lineHeight: "24px",
  margin: "8px 0",
};

const buttonContainer = {
  padding: "27px 0 27px",
  textAlign: "center",
};

const button = {
  backgroundColor: "#FF6B35",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center",
  display: "block",
  width: "200px",
  padding: "14px 20px",
  margin: "0 auto",
};

const footerText = {
  color: "#666",
  fontSize: "14px",
  lineHeight: "24px",
  padding: "0 40px",
  marginTop: "32px",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
  padding: "0 40px",
  marginTop: "16px",
};
