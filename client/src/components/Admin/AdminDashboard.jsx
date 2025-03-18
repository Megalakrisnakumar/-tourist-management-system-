import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button, Tabs, Tab, Box, Avatar, Typography, Paper, Container, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import { Logout, Edit, Delete, CloudUpload } from "@mui/icons-material";
import AllBookings from "./AllBookings";
import AdminUpdateProfile from "./AdminUpdateProfile";
import AddPackages from "./AddPackages";
import AllPackages from "./AllPackages";
import RatingsReviews from "./RatingsReviews";
import History from "./History";

const StyledTab = styled(Tab)({
  transition: "all 0.3s",
  "&.Mui-selected": {
    backgroundColor: "#1976d2",
    color: "white",
    borderRadius: "10px 10px 0 0",
  },
  "&:hover": {
    backgroundColor: "rgba(25, 118, 210, 0.2)",
  },
});

const PackageAdminDashboard = () => {
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const [profilePhoto, setProfilePhoto] = useState(undefined);
  const [activePanelId, setActivePanelId] = useState(1);
  const currentUser = JSON.parse(localStorage.getItem("user"));

  return (
    <Box >
      {/* <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">Admin Dashboard</Typography>
          <Button color="inherit" onClick={() => navigate("/login")}>Logout</Button>
        </Toolbar>
      </AppBar> */}
      <Container sx={{ display: "flex", flexGrow: 1, mt: 2 }}>
        {/* <Paper sx={{ width: "30%", p: 3, textAlign: "center" }} elevation={5}>
          <Box position="relative" display="inline-block">
            <Avatar
              src={profilePhoto ? URL.createObjectURL(profilePhoto) : currentUser.avatar}
              sx={{ width: 120, height: 120, cursor: "pointer" }}
              onClick={() => fileRef.current.click()}
            />
            <IconButton
              sx={{ position: "absolute", bottom: 0, right: 0, bgcolor: "rgba(0, 0, 0, 0.6)", color: "white" }}
              onClick={() => fileRef.current.click()}
            >
              <CloudUpload />
            </IconButton>
          </Box>
          <input
            type="file"
            hidden
            ref={fileRef}
            accept="image/*"
            onChange={(e) => setProfilePhoto(e.target.files[0])}
          />
          <Typography variant="h6" sx={{ mt: 2 }}>Hi, {currentUser.username}!</Typography>
          <Typography>Email: {currentUser.email}</Typography>
          <Typography>Phone: {currentUser.phone}</Typography>
          <Typography>Address: {currentUser.address}</Typography>
          <Box sx={{ mt: 2, display: "flex", justifyContent: "space-around" }}>
            <IconButton color="error">
              <Logout />
            </IconButton>
            <IconButton color="primary" onClick={() => setActivePanelId(8)}>
              <Edit />
            </IconButton>
            <IconButton color="error">
              <Delete />
            </IconButton>
          </Box>
        </Paper> */}
        <Box sx={{ flexGrow: 1, ml: 2 }}>
          <Tabs
            value={activePanelId}
            onChange={(e, newValue) => setActivePanelId(newValue)}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
          >
            <StyledTab label="Bookings" value={1} />
            <StyledTab label="Add Packages" value={2} />
            <StyledTab label="All Packages" value={3} />
            <StyledTab label="Ratings/Reviews" value={6} />
            <StyledTab label="History" value={7} />
          </Tabs>
          <Box sx={{ p: 3 }}>
            {activePanelId === 1 ? (
              <AllBookings />
            ) : activePanelId === 2 ? (
              <AddPackages />
            ) : activePanelId === 3 ? (
              <AllPackages />
            ) : activePanelId === 6 ? (
              <RatingsReviews />
            ) : activePanelId === 7 ? (
              <History />
            ) : activePanelId === 8 ? (
              <AdminUpdateProfile />
            ) : (
              <Typography variant="h6" color="error">Page Not Found!</Typography>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default PackageAdminDashboard;
