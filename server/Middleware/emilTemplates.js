export const bookingNotificationContent = (bookingDetails) => {
    const {
      fullName,
      _id,
      guestSize,
      userId,
      tourName,
      TotalPrice,
    } = bookingDetails;
  
    return `
      <h1 style="color: #4CAF50; font-family: 'Arial', sans-serif; text-align: center;">Booking Confirmation</h1>
      
      <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; font-family: 'Arial', sans-serif;">
        <p style="font-size: 16px; color: #444;">Hello <strong>${fullName}</strong>,</p>
        <p style="font-size: 16px; color: #444;">Thank you for your booking! Here are your booking details:</p>
        
        <div style="background-color: #ffffff; padding: 15px; border: 1px solid #ddd; border-radius: 8px; margin: 20px 0;">
          <p><strong>Booking ID:</strong> ${_id}</p>
          <p><strong>guestSize:</strong> ${guestSize}</p>
          <p><strong>User ID</strong> ${userId}</p>
          <p><strong>tourName</strong> ${tourName}</p>
          <p><strong>Total Price:</strong> $${TotalPrice}</p>
        </div>
  
        <p style="font-size: 16px; color: #444;">If you have any questions or need to make changes to your booking, please contact us.</p>
        
        <div style="text-align: center; margin-top: 20px;">
          <a href="${"http://localhost:3000"}/booking/${_id}" style="display: inline-block; background-color: #4CAF50; color: #fff; font-size: 16px; text-decoration: none; padding: 10px 20px; border-radius: 5px; border: 2px solid #4CAF50; transition: background-color 0.3s ease-in-out;">
            View Booking Details
          </a>
        </div>
      </div>
  
      <footer style="margin-top: 20px; text-align: center; font-size: 12px; color: #888;">
        This is an automated message. Please do not reply to this email.
      </footer>
    `;
  };



export  const bookingConfirmationEmail = (booking) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      margin: 0;
      padding: 0;
      background: #f4f4f4;
    }
    .email-container {
      max-width: 600px;
      margin: auto;
      background: #fff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .header {
      background: #007BFF;
      color: #fff;
      padding: 20px;
      text-align: center;
    }
    .content {
      padding: 20px;
      color: #333;
    }
    .content h2 {
      margin-top: 0;
    }
    .info-box {
      border: 1px solid #ddd;
      padding: 10px 15px;
      margin: 10px 0;
      border-radius: 5px;
      background: #fafafa;
    }
    .footer {
      text-align: center;
      padding: 10px;
      font-size: 12px;
      color: #888;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>Booking Confirmation</h1>
    </div>
    <div class="content">
      <h2>Hello ${booking.managedGuest.name},</h2>
      <p>Your customized tour booking has been <strong>${booking.status}</strong>.</p>

      <div class="info-box">
        <strong>Tour:</strong> ${booking.tourDetails.title}<br/>
        <strong>Destination:</strong> ${booking.tourDetails.destination}<br/>
        <strong>Dates:</strong> ${new Date(booking.tourDetails.startDate).toLocaleDateString()} - ${new Date(booking.tourDetails.endDate).toLocaleDateString()}<br/>
      </div>

      <div class="info-box">
        <strong>Guest Name:</strong> ${booking.managedGuest.name}<br/>
        <strong>Email:</strong> ${booking.managedGuest.email}<br/>
        <strong>Phone:</strong> ${booking.managedGuest.phone}<br/>
      </div>

      <div class="info-box">
        <strong>Room Type:</strong> ${booking.accommodation.roomType}<br/>
        <strong>Sharing:</strong> ${booking.accommodation.sharingType}<br/>
        <strong>AC Type:</strong> ${booking.accommodation.acType}<br/>
        <strong>Guests:</strong> ${booking.accommodation.membersCount}<br/>
      </div>

      <div class="info-box">
        <strong>Transport:</strong> ${booking.transportDetails.transportType}<br/>
        <strong>Pickup:</strong> ${booking.transportDetails.pickupLocation}<br/>
        <strong>Drop:</strong> ${booking.transportDetails.dropLocation}<br/>
        <strong>Preferred Time:</strong> ${booking.transportDetails.preferredTime}<br/>
      </div>

      <div class="info-box">
        <strong>Total Amount:</strong> ₹${booking.totalAmount}<br/>
        <strong>Payment Status:</strong> ${booking.paymentStatus}<br/>
      </div>

      <p>We look forward to providing you with an amazing experience!</p>
    </div>
    <div class="footer">
      &copy; ${new Date().getFullYear()} Your Company Name. All rights reserved.
    </div>
  </div>
</body>
</html>
`;

  