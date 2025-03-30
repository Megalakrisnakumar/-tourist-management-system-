import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import Booking from "../models/booking.model.js";



// Method to Generate Tourist Pass PDF
export const generateTouristPass = async (bookingId,username,packagename,imagePath) => {
  try {
    const booking = await Booking.findById(bookingId)
      .populate("buyer")
      .populate("packageDetails");

    if (!booking) {
      throw new Error("Booking not found");
    }

    const userName =username;
    const packageName =packagename;
    const passPrice = booking.totalPrice;
    const date = booking.date;

    const doc = new PDFDocument();
    const fileName = `TouristPass_${bookingId}.pdf`;
    const filePath = path.join("public", "passes", fileName);
    
    doc.pipe(fs.createWriteStream(filePath));

    // Header
    doc.fontSize(20).text("Tourist Pass", { align: "center" });
    doc.moveDown();

    // Pass Details
    doc.fontSize(14).text(`Name: ${userName}`);
    doc.text(`Package: ${packageName}`);
    doc.text(`Date: ${date}`);
    doc.text(`Price: ₹${passPrice}`);
    doc.text(`Status: ${booking.status}`);
    
    // QR Code Placeholder (Can integrate QR Code generation later)
    doc.moveDown();
    if (fs.existsSync(imagePath)) {
        doc.image(imagePath, {
          fit: [150, 150], // Adjust image size
          align: "center",
          valign: "center",
        });
      } else {
        console.error("Image not found:", imagePath);
      }
    

    doc.end();

    return filePath; // Return the file path to use in download
  } catch (error) {
    console.error("Error generating pass:", error);
    throw error;
  }
};
