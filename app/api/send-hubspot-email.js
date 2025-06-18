export const POST = async (req, res) => {
  const { emailType, recipientEmail, properties } = req.body;

  const response = await fetch(
    "https://api.hubapi.com/marketing/v3/transactional/single-email/send",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emailId:
          emailType === "hotel-member" ? "TEMPLATE_ID_1" : "TEMPLATE_ID_2",
        message: {
          to: recipientEmail,
          customProperties: properties, // e.g., { trip_id: "123", hotel_name: "Bortis" }
        },
      }),
    }
  );

  res.status(response.ok ? 200 : 500).json(await response.json());
};
