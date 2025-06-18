export const flightConfirmationEmail = (reservationDetails) => {
  // Destructure with fallbacks for all possible fields
  const {
    tripId = "N/A",
    departureCity = "Not specified",
    arrivalCity = "Not specified",
    departureDate = "Not specified",
    returnDate = "Not specified",
    adults = 1,
    children = 0,
    class: flightClass = "Not specified",
    airlinePreference = "None",
    specialRequests = "None",
    child1Age = "",
    child2Age = "",
    startDate = "Not specified",
    endDate = "Not specified",
  } = reservationDetails;

  // Format dates if they exist
  const formatDate = (dateStr) => {
    if (!dateStr || dateStr === "Not specified") return dateStr;
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  // Handle children information
  const childrenInfo = [];
  if (children > 0) {
    childrenInfo.push(`Total children: ${children}`);
    if (child1Age) childrenInfo.push(`Child 1 age: ${child1Age}`);
    if (child2Age) childrenInfo.push(`Child 2 age: ${child2Age}`);
  }

  // Generate HTML email
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #3b82f6; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; border: 1px solid #ddd; }
        .section { margin-bottom: 15px; }
        .label { font-weight: bold; color: #555; }
        .footer { margin-top: 20px; font-size: 0.9em; color: #777; text-align: center; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>✈️ Your Flight Reservation Confirmation</h2>
        </div>
        
        <div class="content">
          <div class="section">
            <p>Thank you for booking with Travel Buddy! Here are your flight details:</p>
          </div>
          
          <div class="section">
            <span class="label">Trip ID:</span> ${tripId}<br>
            <span class="label">Departure:</span> ${departureCity} on ${formatDate(
    departureDate
  )}<br>
            <span class="label">Arrival:</span> ${arrivalCity} on ${formatDate(
    returnDate
  )}<br>
            <span class="label">Trip Dates:</span> ${formatDate(
              startDate
            )} to ${formatDate(endDate)}
          </div>
          
          <div class="section">
            <span class="label">Passengers:</span><br>
            - Adults: ${adults}<br>
            ${childrenInfo.length > 0 ? "- " + childrenInfo.join("<br>- ") : ""}
          </div>
          
          <div class="section">
            <span class="label">Flight Class:</span> ${flightClass}<br>
            <span class="label">Airline Preference:</span> ${airlinePreference}
          </div>
          
          ${
            specialRequests !== "None"
              ? `
          <div class="section">
            <span class="label">Special Requests:</span><br>
            ${specialRequests}
          </div>
          `
              : ""
          }
          
          <div class="section">
            <p>We'll contact you once your flights are confirmed with the exact details.</p>
          </div>
        </div>
        
        <div class="footer">
          <p>Need help? Contact our support team at support@travelbuddy.com</p>
          <p>© ${new Date().getFullYear()} Travel Buddy. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};
