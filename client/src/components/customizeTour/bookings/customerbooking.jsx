import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  Button,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { Download, Email, PictureAsPdf } from "@mui/icons-material";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import axios from "axios";

const StatusEnum = ["Pending", "Confirmed", "Cancelled"];

const CustomTourBookingTable = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/customize-tour-bookings")
      .then((res) => res.json())
      .then((data) => {
        const updated = data.map((booking) => {
          if (booking.paymentStatus === "Completed" && booking.status !== "Confirmed") {
            booking.status = "Confirmed";
          }
          return booking;
        });
        setBookings(updated);
      });
  }, []);

  const handleStatusChange = async (id, value) => {
    const updatedBookings = bookings.map((b) =>
      b._id === id ? { ...b, status: value } : b
    );

  await  axios.put(`http://localhost:8000/api/customize-tour-bookings/${id}`,{status:value})           

    setBookings(updatedBookings);
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(bookings);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Bookings");
    XLSX.writeFile(wb, "Bookings.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(10);
    let y = 10;
    bookings.forEach((b, i) => {
      doc.setFillColor(230, 230, 250);
      doc.rect(10, y, 190, 50, 'F');
      doc.setTextColor(0);
      doc.text(`Booking ${i + 1}`, 15, y + 5);
      doc.text(`Title: ${b.tourDetails.title}`, 15, y + 12);
      doc.text(`Destination: ${b.tourDetails.destination}`, 15, y + 19);
      doc.text(`Guest: ${b.managedGuest.name}`, 15, y + 26);
      doc.text(`Transport: ${b.transportDetails.transportType}`, 15, y + 33);
      doc.text(`Room: ${b.accommodation.roomType}`, 15, y + 40);
      doc.text(`Status: ${b.status}`, 15, y + 47);
      doc.text(`Payment: ${b.paymentStatus}`, 100, y + 47);
      y += 60;
      if (y > 270) {
        doc.addPage();
        y = 10;
      }
    });
    doc.save("Bookings.pdf");
  };


  const sendToConfirmEmail = () => {

    bookings.forEach((booking) => {
      if (booking.status === "Confirmed") {
        fetch("http://localhost:8000/api/send-confirm-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bookingId: booking._id }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data.message);
            alert("Confirmation email sent successfully!");
          })
          .catch((error) => {
            console.error("Error:", error);
            alert("Failed to send confirmation email.");
          });
      }
    });

  }

  return (
    <motion.div
      className="p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Typography variant="h4" gutterBottom>
        Customized Tour Bookings
      </Typography>
      <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
        <Button
          variant="contained"
          color="success"
          startIcon={<Download />}
          onClick={exportToExcel}
        >
          Export Excel
        </Button>
        <Button
          variant="contained"
          color="error"
          startIcon={<PictureAsPdf />}
          onClick={exportToPDF}
        >
          Export PDF
        </Button>

        <Button
          variant="contained"
          color="primary"
          startIcon={<Email/>}
          onClick={sendToConfirmEmail}
          
        >
         send To Confirm Email 
        </Button>

      </div>
      <TableContainer component={Paper} elevation={4}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Destination</TableCell>
              <TableCell>Guest Name</TableCell>
              <TableCell>Transport</TableCell>
              <TableCell>Room</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Payment</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking) => (
              <motion.tr
                key={booking._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <TableCell>{booking.tourDetails.title}</TableCell>
                <TableCell>{booking.tourDetails.destination}</TableCell>
                <TableCell>{booking.managedGuest.name}</TableCell>
                <TableCell>{booking.transportDetails.transportType}</TableCell>
                <TableCell>{booking.accommodation.roomType}</TableCell>
                <TableCell>
                  <Select
                    value={booking.status}
                    onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                  >
                    {StatusEnum.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
                <TableCell>{booking.paymentStatus}</TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </motion.div>
  );
};

export default CustomTourBookingTable;
