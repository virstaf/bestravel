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

const TrialEndingReminderEmail = ({ fullname, trialEndsAt, link }) => {
  const formattedDate = new Date(trialEndsAt).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Html>
      <Head />
      <Preview>Your Virstravel trial ends in 3 days - Don't miss out!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Your Trial is Ending Soon! ⏰</Heading>
          <Text style={text}>Hi {fullname},</Text>
          <Text style={text}>
            Your 7-day free trial of Virstravel Club is coming to an end on{" "}
            <strong>{formattedDate}</strong>.
          </Text>
          <Text style={text}>
            We hope you've enjoyed exploring all the exclusive travel perks,
            discounts, and VIP benefits that come with your membership!
          </Text>

          <Section style={benefitsBox}>
            <Text style={benefitsTitle}>
              Don't lose access to these amazing benefits:
            </Text>
            <Text style={benefitItem}>✈️ Up to 50% off hotels worldwide</Text>
            <Text style={benefitItem}>
              🌐 Free eSIM data with every booking
            </Text>
            <Text style={benefitItem}>
              🎫 Exclusive flash sales and early access
            </Text>
            <Text style={benefitItem}>
              ✨ 24/7 concierge and travel support
            </Text>
            <Text style={benefitItem}>
              🛫 Airport lounge access and upgrades
            </Text>
          </Section>

          <Text style={text}>
            To continue enjoying these perks, simply choose your membership plan
            before your trial expires. No interruption, no hassle!
          </Text>

          <Section style={buttonContainer}>
            <Button style={button} href={link}>
              Choose Your Plan
            </Button>
          </Section>

          <Text style={footerText}>
            Questions? Our support team is here to help 24/7.
          </Text>

          <Text style={footer}>
            Best regards,
            <br />
            The Virstravel Team
          </Text>

          <Text style={footer}>
            If you prefer not to continue, no action is needed. Your trial will
            simply expire and you won't be charged.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default TrialEndingReminderEmail;

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
