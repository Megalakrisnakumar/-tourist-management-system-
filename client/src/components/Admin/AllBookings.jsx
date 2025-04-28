import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Paper, TextField, Typography, Button, Avatar, Select, MenuItem } from "@mui/material";
import { motion } from "framer-motion";

const AllBookings = () => {
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const [currentBookings, setCurrentBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const getAllBookings = async () => {
    setCurrentBookings([]);
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:8000/api/package/booking/get-allBookings`);
      const data = await res.json();
      if (data?.success) {
        setCurrentBookings(data?.bookings);
        setLoading(false);
        setError(false);
      } else {
        setLoading(false);
        setError(data?.message);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllBookings();
  }, []);

  const handleCancel = async (id) => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:8000/api/package/booking/cancel-booking/${id}/${currentUser._id}`,
        {
          method: "POST",
        }
      );
      const data = await res.json();
      if (data?.success) {
        alert(data?.message);
        getAllBookings();
      } else {
        alert(data?.message);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:8000/api/package/booking/update/status/${bookingId}`,///booking/status/
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      const data = await res.json();
      if (data?.success) {
        alert("Status Updated Successfully!");
        getAllBookings();
      } else {
        alert(data?.message);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Box display="flex" justifyContent="center" width="100%">
      <Paper
        elevation={6}
        sx={{
          width: "95%",
          p: 3,
          borderRadius: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {loading && <Typography variant="h6" align="center">Loading...</Typography>}
        {error && <Typography variant="h6" align="center" color="error">{error}</Typography>}
        <Box borderBottom={4} p={3}>
          <TextField
            fullWidth
            label="Search Username or Email"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>
        {currentBookings
          .filter((booking) =>
            booking?.buyer?.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking?.buyer?.email?.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((booking, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px",
                borderBottom: "2px solid #ddd",
              }}
            >
              <Link to={`/package/${booking?.packageDetails?._id}`}>
                <Avatar
                  src={booking?.packageDetails?.packageImages[0]}
                  alt="Package Image"
                  sx={{ width: 48, height: 48, borderRadius: 1 }}
                />
              </Link>

              <Link to={`/package/${booking?.packageDetails?._id}`}>
                <Typography
                  variant="body1"
                  sx={{ textDecoration: "none", cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
                >
                  {booking?.packageDetails?.packageName}
                </Typography>
              </Link>

              <Typography>{booking?.buyer?.username}</Typography>
              <Typography>{booking?.buyer?.email}</Typography>
              <Typography>{booking?.date}</Typography>

              {/* --- Status Dropdown --- */}
              <Select
                value={booking?.status || "Pending"}
                defaultValue={booking?.status}
                onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                size="small"
                sx={{ width: 150 }}
              >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Confirmed">Confirmed</MenuItem>
                <MenuItem value="Cancelled">Cancelled</MenuItem>
              </Select>

              <Button
                variant="contained"
                color="error"
                onClick={() => handleCancel(booking._id)}
                sx={{ textTransform: "none" }}
              >
                Cancel
              </Button>
            </motion.div>
          ))}
      </Paper>
    </Box>
  );
};

export default AllBookings;
