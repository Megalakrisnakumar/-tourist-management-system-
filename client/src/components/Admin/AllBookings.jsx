import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Chart from "./chart/Chartpackage";
import { Box, Paper, TextField, Typography, Button, List, ListItem, Avatar } from "@mui/material";
import { motion } from "framer-motion";

const AllBookings = () => {
  const currentUser=JSON.parse(localStorage.getItem("user"))
 
  const [currentBookings, setCurrentBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const getAllBookings = async () => {
    setCurrentBookings([]);
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:8000/api/package/booking/get-currentBookings?searchTerm=${searchTerm}`
      );
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
    }
  };

  useEffect(() => {
    getAllBookings();
  }, [searchTerm]);

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
        setLoading(false);
        alert(data?.message);
        getAllBookings();
      } else {
        setLoading(false);
        alert(data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
     <Box display="flex" justifyContent="center" width="100%">
         <Paper elevation={6} sx={{ width: "95%", p: 3, borderRadius: 3, display: "flex", flexDirection: "column", gap: 2 }}>
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
           {currentBookings.map((booking, i) => (
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
