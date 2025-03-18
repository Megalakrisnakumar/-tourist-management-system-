import React, { useEffect, useState } from "react";
import { FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { Box, Button, Card, CardContent, Grid, TextField, Typography, Paper, IconButton } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

import { useNavigate, useParams } from "react-router";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";

const PackageBooking = () => {
  const currentUser = JSON.parse(localStorage.getItem("user"))
  const params = useParams();

  const navigate = useNavigate();
  const [packageData, setPackageData] = useState({
    packageName: "",
    packageDescription: "",
    packageDestination: "",
    packageDays: 1,
    packageNights: 1,
    packageAccommodation: "",
    packageTransportation: "",
    packageMeals: "",
    packageActivities: "",
    packagePrice: 500,
    packageDiscountPrice: 0,
    packageOffer: false,
    packageRating: 0,
    packageTotalRatings: 0,
    packageImages: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [bookingData, setBookingData] = useState({
    totalPrice: 0,
    packageDetails: null,
    buyer: null,
    persons: 1,
    date: null,
  });
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  const getPackageData = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:8000/api/package/get-package-data/${params?.id}`
      );
      const data = await res.json();
      if (data?.success) {
        setPackageData({
          packageName: data?.packageData?.packageName,
          packageDescription: data?.packageData?.packageDescription,
          packageDestination: data?.packageData?.packageDestination,
          packageDays: data?.packageData?.packageDays,
          packageNights: data?.packageData?.packageNights,
          packageAccommodation: data?.packageData?.packageAccommodation,
          packageTransportation: data?.packageData?.packageTransportation,
          packageMeals: data?.packageData?.packageMeals,
          packageActivities: data?.packageData?.packageActivities,
          packagePrice: data?.packageData?.packagePrice,
          packageDiscountPrice: data?.packageData?.packageDiscountPrice,
          packageOffer: data?.packageData?.packageOffer,
          packageRating: data?.packageData?.packageRating,
          packageTotalRatings: data?.packageData?.packageTotalRatings,
          packageImages: data?.packageData?.packageImages,
        });
        setLoading(false);
      } else {
        setError(data?.message || "Something went wrong!");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //get paymentgateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8000/api/package/braintree/token`);
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [currentUser]);

  //handle payment & book package
  const handleBookPackage = async () => {
    if (
      bookingData.packageDetails === "" ||
      bookingData.buyer === "" ||
      bookingData.totalPrice <= 0 ||
      bookingData.persons <= 0 ||
      bookingData.date === ""
    ) {
      alert("All fields are required!");
      return;
    }
    try {

      setLoading(true);
      console.log(params?.id);
      
      const res = await fetch(`http://localhost:8000/api/package/booking/book-package/${params?.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });
      const data = await res.json();
      if (data?.success) {
        setLoading(false);
        alert(data?.message);
        navigate(`/profile/${currentUser?.user_role === 1 ? "admin" : "user"}`);
      } else {
        setLoading(false);
        alert(data?.message);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params?.id) {
      getPackageData();
    }
    let date = new Date().toISOString().substring(0, 10);
    let d = date.substring(0, 8) + (parseInt(date.substring(8)) + 1);
    setCurrentDate(d);
  }, [params?.id]);

  useEffect(() => {
    if (packageData && params?.id) {
      setBookingData({
        ...bookingData,
        packageDetails: params?.id,
        buyer: currentUser?._id,
        totalPrice: packageData?.packageDiscountPrice
          ? packageData?.packageDiscountPrice * bookingData?.persons
          : packageData?.packagePrice * bookingData?.persons,
      });
    }
  }, [packageData, params]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" width="100%" py={4}>
      <Card sx={{ width: "95%", p: 3, boxShadow: 5, borderRadius: 3 }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
          Book Package
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {/* User Info */}
          <Grid item xs={12} md={5}>
            <Paper sx={{ p: 3, borderRadius: 2 }} elevation={4}>
              <TextField label="Username" value={currentUser.username} fullWidth disabled variant="outlined" margin="normal" />
              <TextField label="Email" value={currentUser.email} fullWidth disabled variant="outlined" margin="normal" />
              <TextField label="Address" value={currentUser.address} fullWidth disabled multiline rows={2} variant="outlined" margin="normal" />
              <TextField label="Phone" value={currentUser.phone} fullWidth disabled variant="outlined" margin="normal" />
            </Paper>
          </Grid>

          {/* Package Info */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, borderRadius: 2 }} elevation={4}>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <img src={packageData.packageImages[0]} alt="Package" style={{ width: 100, borderRadius: 8 }} />
                </Grid>
                <Grid item>   
                  <Typography variant="h6" fontWeight="bold">{packageData.packageName}</Typography>
                  <Typography color="success.main" display="flex" alignItems="center" gap={1}>
                    <FaMapMarkerAlt /> {packageData.packageDestination}
                  </Typography>
                  {(+packageData.packageDays > 0 || +packageData.packageNights > 0) && (
                    <Typography display="flex" alignItems="center" gap={1}>
                      <FaClock />
                      {+packageData.packageDays > 0 && `${packageData.packageDays} Day(s)`}
                      {+packageData.packageDays > 0 && +packageData.packageNights > 0 && " - "}
                      {+packageData.packageNights > 0 && `${packageData.packageNights} Night(s)`}
                    </Typography>
                  )}
                </Grid>
              </Grid>
              
              <TextField
                label="Select Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                inputProps={{ min: currentDate }}
                margin="normal"
                onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
              />
              
              {/* Price */}
              <Typography variant="h6" mt={2}>
                Price: {packageData.packageOffer ? (
                  <>
                    <span style={{ textDecoration: "line-through", color: "gray" }}>${packageData.packagePrice}</span>
                    <span style={{ color: "green", marginLeft: 10 }}>${packageData.packageDiscountPrice}</span>
                    <span style={{ background: "green", color: "white", padding: "5px 10px", borderRadius: 5, marginLeft: 10 }}>
                      {Math.floor(((+packageData.packagePrice - +packageData.packageDiscountPrice) / +packageData.packagePrice) * 100)}% Off
                    </span>
                  </>
                ) : (
                  <span style={{ color: "green" }}>${packageData.packagePrice}</span>
                )}
              </Typography>
              
              {/* Person Counter */}
              <Box display="flex" alignItems="center" mt={2}>
                <IconButton onClick={() => bookingData.persons > 1 && setBookingData({
                  ...bookingData,
                  persons: bookingData.persons - 1,
                  totalPrice: packageData.packageDiscountPrice ? packageData.packageDiscountPrice * (bookingData.persons - 1) : packageData.packagePrice * (bookingData.persons - 1)
                })}>
                  <RemoveIcon />
                </IconButton>
                <TextField value={bookingData.persons} disabled variant="outlined" sx={{ width: 50, textAlign: "center" }} />
                <IconButton onClick={() => bookingData.persons < 10 && setBookingData({
                  ...bookingData,
                  persons: bookingData.persons + 1,
                  totalPrice: packageData.packageDiscountPrice ? packageData.packageDiscountPrice * (bookingData.persons + 1) : packageData.packagePrice * (bookingData.persons + 1)
                })}>
                  <AddIcon />
                </IconButton>
              </Box>
              
              <Typography variant="h6" mt={2}>
                Total Price: <span style={{ color: "green" }}>
                  ${packageData.packageDiscountPrice ? packageData.packageDiscountPrice * bookingData.persons : packageData.packagePrice * bookingData.persons}
                </span>
              </Typography>
              
              {/* Payment */}
              <Typography variant="body1" color={instance ? "error" : "textSecondary"} mt={2}>
                Payment: {!instance ? "Loading..." : "Don't use your original card details! (This is not the production build)"}
              </Typography>
              {clientToken && (
                <>
                  <DropIn
                    options={{ authorization: clientToken, paypal: { flow: "vault" } }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2, py: 1.5, fontWeight: "bold" }}
                    onClick={handleBookPackage}
                    // disabled={loading || !instance || !currentUser?.address}
                  >
                    {loading ? "Processing..." : "Book Now"}
                  </Button>
                </>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default PackageBooking;
