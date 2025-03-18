import React, { useState } from "react";
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, IconButton, Tooltip } from "@mui/material";
import { Home, Tour, Hotel, Add, Book, CardTravel, Menu } from "@mui/icons-material";
import { motion } from "framer-motion";
import AdminDashboard from "./adminDashboard";
import BookingTable from "../Booking/bookingTable";
import TourTable from "../Featured-tours/TourTable";
import AddTour from "../pages/AddTour";
import AccommodationTable from "../Accomondation/AccomondatinTable";
import BookingsAccomondationTable from "../Accomondation/BookingsAccomondationTable";
import AddAccommodation from "../Accomondation/AddAccomondation";
import PackageAdminDashboard from "../Admin/AdminDashboard";

const menuItems = [
  { text: "Dashboard", icon: <Home />, key: "dashboard" },
  { text: "Add Tour", icon: <Add />, key: "Addtour" },
  { text: "Bookings", icon: <Book />, key: "Bookings" },
  { text: "Tours", icon: <Tour />, key: "Tour" },
  { text: "Accommodation", icon: <Hotel />, key: "AccommodationTable" },
  { text: "Accommodation Bookings", icon: <Book />, key: "BookingsAccomondationlist" },
  { text: "Add Accommodation", icon: <Add />, key: "AddAccommodation" },
  { text: "Packages", icon: <CardTravel />, key: "Packages" },
];

export default function Dashboard() {
  const [options, setOptions] = useState("dashboard");
  const [open, setOpen] = useState(false);

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open ? 240 : 70,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: open ? 240 : 70,
            transition: "width 0.3s",
            boxShadow: "2px 0 10px rgba(0,0,0,0.2)",
            overflowX: "hidden",
            bgcolor: "#1e1e2f",
            color: "white",
          },
        }}
      >
        <motion.div
          initial={{ width: 70 }}
          animate={{ width: open ? 240 : 70 }}
          transition={{ duration: 0.3 }}
        >
          <IconButton onClick={() => setOpen(!open)} sx={{ color: "white", margin: "10px" }}>
            <Menu />
          </IconButton>
          <List>
            {menuItems.map(({ text, icon, key }) => (
              <Tooltip title={!open ? text : ""} placement="right" key={key}>
                <ListItemButton
                  onClick={() => setOptions(key)}
                  sx={{
                    color: "white",
                    "&:hover": { bgcolor: "#292945" },
                    display: "flex",
                    gap: "15px",
                  }}
                >
                  <ListItemIcon sx={{ color: "white" }}>{icon}</ListItemIcon>
                  {open && <ListItemText primary={text} />}
                </ListItemButton>
              </Tooltip>
            ))}
          </List>
        </motion.div>
      </Drawer>
      
      {/* Main Content */}
      <div style={{ flexGrow: 1, padding: "20px" }}>
        {options === "dashboard" && <AdminDashboard />}
        {options === "Bookings" && <BookingTable />}
        {options === "Tour" && <TourTable />}
        {options === "Addtour" && <AddTour />}
        {options === "AccommodationTable" && <AccommodationTable />}
        {options === "BookingsAccomondationlist" && <BookingsAccomondationTable />}
        {options === "AddAccommodation" && <AddAccommodation />}
        {options === "Packages" && <PackageAdminDashboard />}
      </div>
    </div>
  );
}