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

const RenewalReminderEmail = ({ fullname, plan, renewalDate, link }) => {
  const formattedDate = new Date(renewalDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Html>
      <Head />
      <Preview>Your Virstravel subscription will renew soon</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Subscription Renewal ✨</Heading>
          <Text style={text}>Hi {fullname},</Text>
          <Text style={text}>
            Just a friendly heads-up that your <strong>{plan}</strong>{" "}
            membership will automatically renew on{" "}
            <strong>{formattedDate}</strong>.
          </Text>
          <Text style={text}>
            We're thrilled to have you as part of the Virstravel Club community,
            and we're committed to bringing you even more exclusive deals and
            travel perks in the coming months.
          </Text>

          <Section style={buttonContainer}>
            <Button style={button} href={link}>
              Manage Subscription
            </Button>
          </Section>

          <Text style={text}>
            If you wish to make any changes to your plan, you can do so anytime
            through your account settings.
          </Text>

          <Text style={footerText}>Thank you for traveling with us!</Text>

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

export default RenewalReminderEmail;

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
  width: "220px",
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
