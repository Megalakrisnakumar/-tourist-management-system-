import React, { useEffect, useRef, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import MyBookings from "../packages/MyBookings";
import MyHistory from "../packages/MyHistory";
import { Button, Card, CardContent, Typography, Box, Avatar, TextField, Tabs, Tab } from "@mui/material";
import { motion } from "framer-motion";
import { styled } from "@mui/system";

const StyledButton = styled(Button)({
  transition: "all 0.3s ease-in-out",
  '&:hover': {
    transform: "scale(1.05)"
  }
});


const Profile = () => {
  const navigate = useNavigate();
 
  const fileRef = useRef(null);
  const currentUser = JSON.parse(localStorage.getItem("user"))
  const [profilePhoto, setProfilePhoto] = useState(undefined);
  const [photoPercentage, setPhotoPercentage] = useState(0);
  const [activePanelId, setActivePanelId] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    avatar: "",
  });

  useEffect(() => {
    if (currentUser !== null) {
      setFormData({
        username: currentUser?.username,
        email: currentUser?.email,
        address: currentUser?.address,
        phone: currentUser?.phone,
        avatar: currentUser?.avatar,
      });
    }
  }, []);

  const handleProfilePhoto = () => {
    try {
     


    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
     
      navigate("/login");
      // alert(data?.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
   
    if (true) {
      try {
     
        const res = await fetch(`http://localhost:8000/api/v1/users/${currentUser._id}`, {
          method: "DELETE",
        });
        const data = await res.json();  
        // if (data?.success === false) {
        
        //   alert("Something went wrong!");
        //   return;
        // }
        
        alert(data?.message);
      } catch (error) {}
    }
  };

  return (
     <Box display="flex" flexWrap="wrap" p={2}>
         {currentUser ? (
           <>
             <Box width={{ xs: "100%", sm: "40%" }} p={3}>
               <Card sx={{ p: 3, boxShadow: 10, textAlign: "center" }}>
                 <CardContent>
                   <Avatar
                     src={currentUser.avatar}
                     sx={{ width: 128, height: 128, mx: "auto", mb: 2, border: "3px solid #1976D2" }}
                   />
                   <Typography variant="h4" fontWeight={600}>
                     Hi {currentUser.username} !
                   </Typography>
                   <Typography variant="body1">Email: {currentUser.email}</Typography>
                   <Typography variant="body1">Phone: {currentUser.phone}</Typography>
                   <Typography variant="body1">Address: {currentUser.address}</Typography>
                 </CardContent>
                 <Box display="flex" justifyContent="space-between" p={2}>
                   <StyledButton variant="contained" color="error" onClick={handleLogout}>
                     Log-out
                   </StyledButton>
                   <StyledButton variant="contained" color="secondary" onClick={() => setActivePanelId(3)}>
                     Edit Profile
                   </StyledButton>
                 </Box>
                 <StyledButton variant="text" color="error" onClick={handleDeleteAccount}>
                   Delete account
                 </StyledButton>
               </Card>
             </Box>
             
             <Box width={{ xs: "100%", sm: "60%" }}>
               <Card sx={{ p: 2, boxShadow: 10 }}>
                 <Tabs
                   value={activePanelId}
                   onChange={(e, newValue) => setActivePanelId(newValue)}
                   textColor="primary"
                   indicatorColor="primary"
                   centered
                 >
                   <Tab label="Bookings" value={1} />
                   <Tab label="History" value={2} />
                 </Tabs>
                 <Box p={2}>
                   {activePanelId === 1 && <MyBookings />}
                   {activePanelId === 2 && <MyHistory />}
                 </Box>
               </Card>
             </Box>
           </>
         ) : (
           <Typography color="error" variant="h6">Login First</Typography>
         )}
       </Box>
  );
};

export default Profile;
