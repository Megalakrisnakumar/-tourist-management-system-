import React from "react";
import { Card, CardContent, Typography, Grid, Box, Divider, Paper } from "@mui/material";
import FlightIcon from "@mui/icons-material/Flight";
import TrainIcon from "@mui/icons-material/Train";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import SubwayIcon from "@mui/icons-material/Subway";
import HotelIcon from "@mui/icons-material/Hotel";
import RestaurantIcon from "@mui/icons-material/Restaurant";

const PriceDetails = () => {
  // Transportation Prices
  const transportPrices = [
    { type: "Flight", price: 5000, icon: <FlightIcon color="primary" /> },
    { type: "Train", price: 1000, icon: <TrainIcon color="secondary" /> },
    { type: "Boat", price: 1500, icon: <DirectionsBoatIcon color="success" /> },
    { type: "Other", price: 800, icon: <DirectionsCarIcon color="action" /> },
  ];

  // Local Transportation Prices
  const localTransportPrices = [
    { type: "Car", price: 500, icon: <DirectionsCarIcon color="error" /> },
    { type: "Bus", price: 300, icon: <DirectionsBusIcon color="primary" /> },
    { type: "Metro", price: 200, icon: <SubwayIcon color="secondary" /> },
    { type: "Other", price: 100, icon: <DirectionsCarIcon color="disabled" /> },
  ];

  // Accommodation & Meal Prices
  const accommodationPrice = 5000;
  const mealPrice = 2000;

  return (
    <Paper elevation={3} sx={{ maxWidth: 500, margin: "auto", padding: 3, borderRadius: 3 }}>
      <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: "bold", color: "#1976d2" }}>
        Price Details
      </Typography>

      {/* Transportation Prices */}
      <Typography variant="h6" sx={{ fontWeight: "bold", mt: 2 }}>
        🚀 Transportation Prices:
      </Typography>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        {transportPrices.map((item) => (
          <Grid item xs={6} key={item.type}>
            <Card sx={{ display: "flex", alignItems: "center", padding: 1, borderRadius: 2 }}>
              <CardContent sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {item.icon}
                <Typography>{item.type}: ₹{item.price}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 2 }} />

      {/* Local Transportation Prices */}
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        🚖 Local Transportation Prices:
      </Typography>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        {localTransportPrices.map((item) => (
          <Grid item xs={6} key={item.type}>
            <Card sx={{ display: "flex", alignItems: "center", padding: 1, borderRadius: 2 }}>
              <CardContent sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {item.icon}
                <Typography>{item.type}: ₹{item.price}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 2 }} />

      {/* Accommodation & Meal Prices */}
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        🏨 Accommodation & Meals:
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
        <Card sx={{ flex: 1, marginRight: 1, padding: 1, borderRadius: 2 }}>
          <CardContent sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <HotelIcon color="primary" />
            <Typography>Accommodation: ₹{accommodationPrice}</Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, padding: 1, borderRadius: 2 }}>
          <CardContent sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <RestaurantIcon color="secondary" />
            <Typography>Meals: ₹{mealPrice}</Typography>
          </CardContent>
        </Card>
      </Box>
    </Paper>
  );
};

export default PriceDetails;
