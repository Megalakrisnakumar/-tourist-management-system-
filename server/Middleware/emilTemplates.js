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
  