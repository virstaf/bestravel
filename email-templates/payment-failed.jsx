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

const PaymentFailedEmail = ({ fullname, plan, link }) => {
  return (
    <Html>
      <Head />
      <Preview>
        Action Required: Payment failed for your Virstravel subscription
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Payment Unsuccessful ⚠️</Heading>
          <Text style={text}>Hi {fullname},</Text>
          <Text style={text}>
            We were unable to process the payment for your{" "}
            <strong>{plan}</strong> membership.
          </Text>
          <Text style={text}>
            To ensure your membership remains active and you don't lose access
            to your exclusive travel benefits, please update your payment
            details.
          </Text>

          <Section style={buttonContainer}>
            <Button style={button} href={link}>
              Update Payment Method
            </Button>
          </Section>

          <Text style={text}>
            Common reasons for payment failure include expired cards,
            insufficient funds, or bank security blocks. After updating your
            information, we will attempt to process the payment again.
          </Text>

          <Text style={footerText}>
            If you need any assistance, our support team is available to help.
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

export default PaymentFailedEmail;

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
  width: "250px",
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
