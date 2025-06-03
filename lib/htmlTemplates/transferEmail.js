export const transferEmailHtml = (details, isAdmin) => {
  // Format the dates for display
  const formattedPickupDate = new Date(details.pickupDate).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const formattedReturnDate = details.returnPickupDate
    ? new Date(details.returnPickupDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

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
    </style>
  `;

  // Transfer type mapping
  const transferTypeMap = {
    airport: "Airport Transfer",
    city: "City Transfer",
    intercity: "Intercity Transfer",
  };

  const transferType =
    transferTypeMap[details.transferType] || details.transferType;

  // Generate details section
  let detailsHtml = `
    <div class="details">
      <h3>Transfer Details</h3>
      <div class="detail-row"><span class="detail-label">Trip ID:</span> ${
        details.tripId
      }</div>
      ${
        isAdmin
          ? `<div class="detail-row"><span class="detail-label">User ID:</span> ${details.userId}</div>`
          : ""
      }
      <div class="detail-row"><span class="detail-label">Transfer Type:</span> ${transferType}</div>
      <div class="detail-row"><span class="detail-label">Pickup Location:</span> ${
        details.pickupLocation
      }</div>
      <div class="detail-row"><span class="detail-label">Dropoff Location:</span> ${
        details.dropoffLocation
      }</div>
      <div class="detail-row"><span class="detail-label">Pickup Date:</span> ${formattedPickupDate}</div>
      <div class="detail-row"><span class="detail-label">Pickup Time:</span> ${
        details.pickupTime
      }</div>
      <div class="detail-row"><span class="detail-label">Vehicle Type:</span> ${details.vehicleType.toUpperCase()}</div>
      <div class="detail-row"><span class="detail-label">Passengers:</span> ${
        details.passengers
      }</div>
  `;

  if (details.returnTransfer) {
    detailsHtml += `
      <div class="detail-row"><span class="detail-label">Return Transfer:</span> Yes</div>
      <div class="detail-row"><span class="detail-label">Return Pickup Date:</span> ${formattedReturnDate}</div>
      <div class="detail-row"><span class="detail-label">Return Pickup Time:</span> ${details.returnPickupTime}</div>
    `;
  } else {
    detailsHtml += `<div class="detail-row"><span class="detail-label">Return Transfer:</span> No</div>`;
  }

  detailsHtml += `
    <div class="detail-row"><span class="detail-label">Special Requests:</span> 
      ${details.specialRequests || "None"}
    </div>
  </div>
  `;

  // Generate the appropriate email based on recipient
  if (isAdmin) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        ${styles}
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Transfer Reservation</h1>
          </div>
          <div class="content">
            <p>A new transfer reservation has been submitted for processing.</p>
            
            ${detailsHtml}

            <p>Please arrange this transfer as soon as possible.</p>
            <a href="https://virstravelclub.com/transfers/${details.tripId}" class="button">View Reservation</a>

            <p>Best regards,<br>Virstravel Club</p>
          </div>
          <div class="footer">
            <p>This is an automated notification.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  } else {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        ${styles}
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Your Transfer Reservation</h1>
          </div>
          <div class="content">
            <p>Dear Traveler,</p>
            <p>We've received your transfer reservation for your upcoming trip.</p>
            
            ${detailsHtml}

            <p>Your driver will contact you ${
              details.pickupTime
            } on ${formattedPickupDate} to confirm pickup details.</p>
            ${
              details.returnTransfer
                ? `<p>Your return transfer is scheduled for ${details.returnPickupTime} on ${formattedReturnDate}.</p>`
                : ""
            }
            
            <p>If you need to make any changes, please contact our support team at least 24 hours before your scheduled pickup.</p>

            <p>Safe travels!<br>The Virstravel Club Team</p>
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
