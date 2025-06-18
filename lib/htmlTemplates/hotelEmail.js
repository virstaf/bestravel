export const hotelEmailHtml = (details) => {
  // Format the dates for display
  const formattedCheckIn = new Date(details.checkIn).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );
  const formattedCheckOut = new Date(details.checkOut).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  // Calculate duration
  const duration = Math.ceil(
    (new Date(details.checkOut) - new Date(details.checkIn)) /
      (1000 * 60 * 60 * 24)
  );

  // Common styles
  const styles = `
    <style>
      .container { max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; line-height: 1.6; }
      .header { background-color: #2563eb; color: white; padding: 20px; text-align: center; }
      .content { padding: 20px; }
      .details { background-color: #f9fafb; border-radius: 5px; padding: 15px; margin: 15px 0; }
      .detail-row { display: flex; margin-bottom: 8px; }
      .detail-label { font-weight: bold; min-width: 150px; }
      .footer { text-align: center; padding: 20px; font-size: 12px; color: #6b7280; }
      .button { 
        display: inline-block; 
        background-color: #2563eb; 
        color: white; 
        padding: 10px 20px; 
        text-decoration: none; 
        border-radius: 5px; 
        margin: 10px 0; 
      }
    </style>
  `;

  // Member HTML
  const memberHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      ${styles}
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Your Hotel Reservation is Confirmed</h1>
        </div>
        <div class="content">
          <p>Dear Traveler,</p>
          <p>We're pleased to confirm your hotel reservation for your upcoming trip to <strong>${
            details.city
          }</strong>.</p>
          
          <div class="details">
            <h3>Reservation Details</h3>
            <div class="detail-row"><span class="detail-label">Trip ID:</span> ${
              details.tripId
            }</div>
            <div class="detail-row"><span class="detail-label">Hotel:</span> ${
              details.preferredHotel
            }</div>
            <div class="detail-row"><span class="detail-label">Location:</span> ${
              details.preferredLocation
            }</div>
            <div class="detail-row"><span class="detail-label">Check-in:</span> ${formattedCheckIn}</div>
            <div class="detail-row"><span class="detail-label">Check-out:</span> ${formattedCheckOut}</div>
            <div class="detail-row"><span class="detail-label">Duration:</span> ${duration} nights</div>
            <div class="detail-row"><span class="detail-label">Room Type:</span> ${
              details.roomType
            }</div>
            <div class="detail-row"><span class="detail-label">Meals:</span> ${
              details.meals === "all-meals"
                ? "All meals included"
                : details.meals
            }</div>
            <div class="detail-row"><span class="detail-label">Special Requests:</span> ${
              details.specialRequests || "None"
            }</div>
          </div>

          <p>If you need to make any changes to your reservation, please contact our support team.</p>
          <p>We wish you a pleasant stay!</p>
          
          <p>Best regards,<br>Virstravel Club System</p>
        </div>
        <div class="footer">
          <p>This is an automated message. Please do not reply directly to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  // Admin HTML
  const adminHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      ${styles}
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Hotel Reservation Submitted</h1>
        </div>
        <div class="content">
          <p>A new hotel reservation has been submitted for processing.</p>
          
          <div class="details">
            <h3>Reservation Details</h3>
            <div class="detail-row"><span class="detail-label">Trip ID:</span> ${
              details.tripId
            }</div>
            <div class="detail-row"><span class="detail-label">User ID:</span> ${
              details.userId
            }</div>
            <div class="detail-row"><span class="detail-label">Destination:</span> ${
              details.city
            }</div>
            <div class="detail-row"><span class="detail-label">Hotel:</span> ${
              details.preferredHotel
            }</div>
            <div class="detail-row"><span class="detail-label">Location Preference:</span> ${
              details.preferredLocation
            }</div>
            <div class="detail-row"><span class="detail-label">Check-in:</span> ${formattedCheckIn}</div>
            <div class="detail-row"><span class="detail-label">Check-out:</span> ${formattedCheckOut}</div>
            <div class="detail-row"><span class="detail-label">Duration:</span> ${duration} nights</div>
            <div class="detail-row"><span class="detail-label">Rooms:</span> ${
              details.rooms
            }</div>
            <div class="detail-row"><span class="detail-label">Room Type:</span> ${
              details.roomType
            }</div>
            <div class="detail-row"><span class="detail-label">Star Rating:</span> ${
              details.starRating
            }</div>
            <div class="detail-row"><span class="detail-label">Meals:</span> ${
              details.meals === "all-meals"
                ? "All meals included"
                : details.meals
            }</div>
            <div class="detail-row"><span class="detail-label">Special Requests:</span> ${
              details.specialRequests || "None"
            }</div>
          </div>

          <p>Please process this reservation as soon as possible.</p>
          <a href="https://youradminpanel.com/reservations/${
            details.tripId
          }" class="button">View Reservation</a>
          
          <p>Best regards,<br>Virstravel Club System</p>
        </div>
        <div class="footer">
          <p>This is an automated notification.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return {
    adminHtml,
    memberHtml,
  };
};

// Example usage:
/*
const details = {
  tripId: "04ed46f8-50f2-4dcf-bc18-f70323900a97",
  userId: "afe1513a-3f4c-4e4c-82e9-bdbe405c2007",
  city: "Paris",
  preferredHotel: "Hotel de Paris",
  preferredLocation: "city center",
  checkIn: "2025-05-26",
  checkOut: "2025-05-30",
  rooms: 1,
  starRating: 3,
  roomType: "single",
  meals: "all-meals",
  specialRequests: "Romantic flowers"
};

const emails = hotelEmailHtml(details);
console.log(emails.adminHtml);
console.log(emails.memberHtml);
*/
