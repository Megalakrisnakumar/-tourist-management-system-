import { bookingNotificationContent } from "./emilTemplates.js";
import  nodemailer from 'nodemailer';
export const sendAccomondationEmail = async (recipientEmail, bookingDetails) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            }

        })

        const emailcontent = bookingNotificationContent(bookingDetails);

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: recipientEmail,
            subject: 'Booking Confirmed',
            html: emailcontent
        })

        console.log("Booking email has been sent");

    } catch (error) {
        console.error('Error sending verification email:', error);
    }
}