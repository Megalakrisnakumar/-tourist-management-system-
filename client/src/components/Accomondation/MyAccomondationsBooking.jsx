import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Grid,
  Box,
} from "@mui/material";
import { motion } from "framer-motion";
import jsPDF from "jspdf";

const statusColors = {
  confirmed: "#4caf50",
  pending: "#ff9800",
  cancelled: "#f44336",
};

const BookingCard = ({ booking }) => {
  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.setTextColor(40);
    doc.text("Accommodation Booking Details", 20, 20);

    const entries = [
      ["Booking ID", booking.bookingId],
      ["Accommodation ID", booking.accommodationId],
      ["Check-In Date", new Date(booking.checkInDate).toLocaleDateString()],
      ["Check-Out Date", new Date(booking.checkOutDate).toLocaleDateString()],
      ["Total Price", `₹${booking.totalPrice}`],
      ["Status", booking.status],
    ];

    let y = 40;
    entries.forEach(([label, value]) => {
      doc.setFont(undefined, "bold");
      doc.text(`${label}:`, 20, y);
      doc.setFont(undefined, "normal");
      doc.text(`${value}`, 80, y);
      y += 10;
    });

    doc.save(`Booking-${booking.bookingId}.pdf`);
  };

  return (
    <motion.div whileHover={{ scale: 1.03 }}>
      <Card
        sx={{
          mb: 2,
          borderLeft: `8px solid ${statusColors[booking.status] || "#2196f3"}`,
          borderRadius: "2xl",
          boxShadow: 3,
        }}
      >
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Booking ID: {booking.bookingId}
          </Typography>
          <Typography>Accommodation ID: {booking.accommodationId}</Typography>
          <Typography>Check-In: {new Date(booking.checkInDate).toLocaleDateString()}</Typography>
          <Typography>Check-Out: {new Date(booking.checkOutDate).toLocaleDateString()}</Typography>
          <Typography>Total Price: ₹{booking.totalPrice}</Typography>
          <Typography sx={{ color: statusColors[booking.status], fontWeight: "bold" }}>
            Status: {booking.status.toUpperCase()}
          </Typography>
          <Button
            variant="contained"
            sx={{ mt: 2, backgroundColor: "#1976d2" }}
            onClick={downloadPdf}
          >
            Download PDF
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const MyAccommodationBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const user=localStorage.getItem("user")
  const userId = JSON.parse(user)._id

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/accomondation/booking/"+userId)
      .then((res) => setBookings(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  const filteredBookings = bookings.filter((b) => {
    return (
      b.bookingId.toLowerCase().includes(search.toLowerCase()) &&
      (filter === "" || b.status === filter)
    );
  });

  return (
    <Box p={4}>
      <Typography variant="h4" mb={4} fontWeight="bold">
        Accommodation Bookings
      </Typography>

      <Grid container spacing={2} mb={4}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Search by Booking ID"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Select
            fullWidth
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            displayEmpty
          >
            <MenuItem value="">All Status</MenuItem>
            <MenuItem value="confirmed">Confirmed</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="cancelled">Cancelled</MenuItem>
          </Select>
        </Grid>
      </Grid>

      {filteredBookings.map((booking) => (
        <BookingCard key={booking._id} booking={booking} />
      ))}
    </Box>
  );
};

export default MyAccommodationBooking;