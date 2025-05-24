export const reservationEmailHtml = (details, type) => {
  // Format dates for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Calculate duration in nights
  const calculateNights = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  };

  // Common styles
  const styles = `
    <style>
      .container { max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; line-height: 1.6; }
      .header { background-color: #2563eb; color: white; padding: 20px; text-align: center; }
      .content { padding: 20px; }
      .details { background-color: #f9fafb; border-radius: 5px; padding: 15px; margin: 15px 0; }
      .detail-row { display: flex; margin-bottom: 8px; }
      .detail-label { font-weight: bold; min-width: 180px; }
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
      .highlight { background-color: #e0e7ff; padding: 2px 5px; border-radius: 3px; }
      .trip-duration { color: #2563eb; font-weight: bold; }
    </style>
  `;

  if (type === "flight-admin") {
    const nights = calculateNights(details.departureDate, details.returnDate);
    const formattedDeparture = formatDate(details.departureDate);
    const formattedReturn = formatDate(details.returnDate);

    return `
      <!DOCTYPE html>
      <html>
      <head>
        ${styles}
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Flight Reservation</h1>
          </div>
          <div class="content">
            <p>A new flight reservation has been submitted for processing.</p>
            
            <div class="details">
              <h3>Flight Details</h3>
              <div class="detail-row"><span class="detail-label">Trip ID:</span> ${
                details.tripId
              }</div>
              <div class="detail-row"><span class="detail-label">User ID:</span> ${
                details.userId
              }</div>
              <div class="detail-row"><span class="detail-label">Route:</span> ${
                details.departureCity
              } → ${details.arrivalCity}</div>
              <div class="detail-row"><span class="detail-label">Departure Date:</span> ${formattedDeparture}</div>
              <div class="detail-row"><span class="detail-label">Return Date:</span> ${formattedReturn}</div>
              <div class="detail-row"><span class="detail-label">Trip Duration:</span> <span class="trip-duration">${nights} nights</span></div>
              <div class="detail-row"><span class="detail-label">Passengers:</span> ${
                details.passengers
              }</div>
              <div class="detail-row"><span class="detail-label">Class:</span> ${
                details.class.charAt(0).toUpperCase() + details.class.slice(1)
              }</div>
              <div class="detail-row"><span class="detail-label">Airline Preference:</span> ${
                details.airlinePreference || "None specified"
              }</div>
              <div class="detail-row"><span class="detail-label">Special Requests:</span> ${
                details.specialRequests || "None"
              }</div>
            </div>

            <p>Please arrange these flights as soon as possible.</p>
            <a href="https://youradminpanel.com/flights/${
              details.tripId
            }" class="button">View Reservation</a>
            
            <p>Best regards,<br>Travel Buddy System</p>
          </div>
          <div class="footer">
            <p>This is an automated notification.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  } else if (type === "hotel-member") {
    const nights = calculateNights(details.checkIn, details.checkOut);
    const formattedCheckIn = formatDate(details.checkIn);
    const formattedCheckOut = formatDate(details.checkOut);

    return `
      <!DOCTYPE html>
      <html>
      <head>
        ${styles}
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Your Hotel Reservation</h1>
          </div>
          <div class="content">
            <p>Dear Traveler,</p>
            <p>We're pleased to confirm your hotel reservation for your upcoming stay in ${
              details.preferredLocation
            }.</p>
            
            <div class="details">
              <h3>Reservation Details</h3>
              <div class="detail-row"><span class="detail-label">Trip ID:</span> ${
                details.tripId
              }</div>
              <div class="detail-row"><span class="detail-label">Hotel:</span> ${
                details.hotelName
              }</div>
              <div class="detail-row"><span class="detail-label">Location:</span> ${
                details.preferredLocation
              }</div>
              <div class="detail-row"><span class="detail-label">Check-in:</span> ${formattedCheckIn}</div>
              <div class="detail-row"><span class="detail-label">Check-out:</span> ${formattedCheckOut}</div>
              <div class="detail-row"><span class="detail-label">Duration:</span> <span class="trip-duration">${nights} nights</span></div>
              <div class="detail-row"><span class="detail-label">Rooms:</span> ${
                details.rooms
              }</div>
              <div class="detail-row"><span class="detail-label">Bed Type:</span> ${
                details.bedType.charAt(0).toUpperCase() +
                details.bedType.slice(1)
              }</div>
              <div class="detail-row"><span class="detail-label">Star Rating:</span> ${"★".repeat(
                details.starRating
              )}</div>
              <div class="detail-row"><span class="detail-label">Meals:</span> ${
                details.meals === "all-meals"
                  ? "All meals included"
                  : details.meals
              }</div>
              <div class="detail-row"><span class="detail-label">Special Requests:</span> ${
                details.specialRequests || "None"
              }</div>
            </div>

            <p>Your reservation is being processed. You'll receive a confirmation email once your booking is complete.</p>
            ${
              details.specialRequests.includes("vegetarian")
                ? "<p>We have noted your vegetarian dietary requirements.</p>"
                : ""
            }
            
            <p>If you need to make any changes, please contact our support team at least 48 hours before your check-in date.</p>
            
            <p>We wish you a pleasant stay!<br>The Travel Buddy Team</p>
          </div>
          <div class="footer">
            <p>This is an automated message. Please do not reply directly to this email.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
};

// Example usage:
/*
const flightAdminDetails = {
  tripId: "2e4eba45-29ee-4684-b86e-d28c20dfd105",
  userId: "39c7aefe-de58-4869-bb68-b7d52f71125f",
  departureCity: "Accra",
  arrivalCity: "Paris",
  departureDate: "2025-05-30",
  returnDate: "2025-06-07",
  passengers: "2",
  class: "economy",
  airlinePreference: "",
  specialRequests: ""
};

const hotelMemberDetails = {
  tripId: "2e4eba45-29ee-4684-b86e-d28c20dfd105",
  hotelName: "Any Nice One",
  preferredLocation: "City center",
  checkIn: "2025-05-30",
  checkOut: "2025-06-07",
  rooms: 1,
  starRating: 3,
  bedType: "single",
  meals: "all-meals",
  specialRequests: "I'm vegetarian, thanks."
};

const adminFlightEmail = reservationEmailHtml(flightAdminDetails, 'flight-admin');
const memberHotelEmail = reservationEmailHtml(hotelMemberDetails, 'hotel-member');

console.log("Admin Flight Email:", adminFlightEmail);
console.log("Member Hotel Email:", memberHotelEmail);
*/
