import {
  Html,
  Body,
  Container,
  Heading,
  Text,
  Img,
  Tailwind,
  Section,
  Row,
  Column,
} from "@react-email/components";

const DealRequestAdminEmail = ({ fullname, email, requestDetails, user }) => {
  return (
    <Html>
      <Tailwind>
        <Body className="bg-gray-100 text-gray-900 mx-auto font-sans my-12">
          <Container className="p-8 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
            <Container className="mx-auto mt-8 mb-8">
              <Img
                src="https://ylpkcsmbsnowmbyxhbzw.supabase.co/storage/v1/object/public/static//virstravel.png"
                width="150"
                height="60"
                alt="Virstravel"
                className="mx-auto my-6"
              />
              <Heading className="text-xl font-bold text-center mb-6">
                New Deal Request Received
              </Heading>

              <Section className="mb-6 p-4 bg-blue-50 rounded-lg">
                <Text className="font-bold mb-2 text-lg">Request Summary</Text>
                <Row className="mb-2">
                  <Column className="font-semibold w-32">From:</Column>
                  <Column>{requestDetails.from.name}</Column>
                </Row>
                <Row className="mb-2">
                  <Column className="font-semibold w-32">To:</Column>
                  <Column>{requestDetails.to.name}</Column>
                </Row>
                <Row className="mb-2">
                  <Column className="font-semibold w-32">Types:</Column>
                  <Column>{requestDetails.types.join(", ")}</Column>
                </Row>
                <Row className="mb-2">
                  <Column className="font-semibold w-32">Dates:</Column>
                  <Column>{requestDetails.dates}</Column>
                </Row>
                <Row className="mb-2">
                  <Column className="font-semibold w-32">Requested At:</Column>
                  <Column>{new Date().toLocaleString()}</Column>
                </Row>
              </Section>

              <Section className="mb-6">
                <Text className="font-bold mb-2 text-lg">Customer Details</Text>
                <Row className="mb-1">
                  <Column className="font-semibold w-32">Name:</Column>
                  <Column>{fullname}</Column>
                </Row>
                <Row className="mb-1">
                  <Column className="font-semibold w-32">Email:</Column>
                  <Column>{email}</Column>
                </Row>
                {user?.customer_id && (
                  <Row className="mb-1">
                    <Column className="font-semibold w-32">Member ID:</Column>
                    <Column>{user.customer_id}</Column>
                  </Row>
                )}
              </Section>

              <Text className="mt-8 text-center text-sm text-gray-500">
                This request is pending in the Deals Queue.
              </Text>
            </Container>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default DealRequestAdminEmail;
