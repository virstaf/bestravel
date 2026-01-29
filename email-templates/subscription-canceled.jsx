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

const SubscriptionCanceledEmail = ({ fullname, plan, link }) => {
  return (
    <Html>
      <Head />
      <Preview>
        Confirmation: Your Virstravel subscription has been canceled
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Subscription Canceled 🕊️</Heading>
          <Text style={text}>Hi {fullname},</Text>
          <Text style={text}>
            This email confirms that your <strong>{plan}</strong> membership has
            been canceled as per your request.
          </Text>
          <Text style={text}>
            You will continue to have access to your membership benefits until
            the end of your current billing period. After that, your membership
            will shift to our Free tier.
          </Text>

          <Text style={text}>
            We're sorry to see you go! If you ever decide to come back, we'll be
            here with the same great travel deals and perks.
          </Text>

          <Section style={buttonContainer}>
            <Button style={button} href={link}>
              View Your Account
            </Button>
          </Section>

          <Text style={footerText}>
            Was this a mistake? You can restart your membership anytime from
            your dashboard.
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

export default SubscriptionCanceledEmail;

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
