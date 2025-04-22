import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import {
  FaArrowDown,
  FaArrowLeft,
  FaArrowRight,
  FaArrowUp,
  FaClock,
  FaMapMarkerAlt,
  FaShare,
} from "react-icons/fa";
import Rating from "@mui/material/Rating";
import {  Button, Typography, Card, CardContent, IconButton, Snackbar } from "@mui/material";

import RatingCard from "./RatingCard";
import MuiCarousel from "./Carousel";
import PackageActivitiesView from "./packageActivityView";

const Package = () => {
  // SwiperCore.use([Navigation]);
  const currentUser = JSON.parse(localStorage.getItem("user"));
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
  const [copied, setCopied] = useState(false);
  const [ratingsData, setRatingsData] = useState({
    rating: 0,
    review: "",
    packageId: params?.id,
    userRef: currentUser?._id,
    username: currentUser?.username,
    userProfileImg: currentUser?.avatar,
  });
  const [packageRatings, setPackageRatings] = useState([]);
  const [ratingGiven, setRatingGiven] = useState(false);

  const getPackageData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:8000/api/package/get-package-data/${params?.id}`);
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
          _id:data?.packageData?._id
        });
        setLoading(false);
      } else {
        setError(data?.message || "Something went wrong!");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const giveRating = async () => {
    checkRatingGiven();
    if (ratingGiven) {
      alert("You already submittd your rating!");
      return;
    }
    if (ratingsData.rating === 0 && ratingsData.review === "") {
      alert("Atleast 1 field is required!");
      return;
    }
    if (
      ratingsData.rating === 0 &&
      ratingsData.review === "" &&
      !ratingsData.userRef
    ) {
      alert("All fields are required!");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch("http://localhost:8000/api/package/rating/give-rating", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ratingsData),
      });
      const data = await res.json();
      if (data?.success) {
        setLoading(false);
        alert(data?.message);
        getPackageData();
        getRatings();
        checkRatingGiven();
      } else {
        setLoading(false);
        alert(data?.message || "Something went wrong!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getRatings = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/package/rating/get-ratings/${params.id}/4`);
      const data = await res.json();
      if (data) {
        setPackageRatings(data);
      } else {
        setPackageRatings("No ratings yet!");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const checkRatingGiven = async () => {
    try {
      const res = await fetch(
        `http://localhost:8000/api/package/rating/rating-given/${currentUser?._id}/${params?.id}`
      );
      const data = await res.json();
      setRatingGiven(data?.given);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (params.id) {
      getPackageData();
      getRatings();
    }
    if (currentUser) {
      checkRatingGiven();
    }
  }, []);

  return (
      <div  style={{display:"flex",alignItems:"center",justifyContent:"space-evenly",backgroundColor:"#CCC6F3"}}>
        {loading && <Typography align="center" variant="h6">Loading...</Typography>}
        {error && (
          <Card sx={{ textAlign: "center", padding: 2, margin: 2, backgroundColor: "#ffdddd" }}>
            <Typography color="error">Something went wrong!</Typography>
            <Button variant="contained" color="primary" component={Link} to="/">
              Back
            </Button>
          </Card>
        )}
        {packageData && !loading && !error && (
          <div   style={{display:"flex",alignItems:"center",justifyContent:"space-evenly",gap:"30px"}}>
            <br />
            <MuiCarousel images={packageData.packageImages}  />
  
            <IconButton
              sx={{ position: "absolute", top: "10%", right: "3%", backgroundColor: "white" }}
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
              }}
            >
              <FaShare />
            </IconButton>
  
            <IconButton sx={{ position: "absolute", top: "10%", left: "3%", backgroundColor: "white" }} onClick={() => navigate("/")}> 
              <FaArrowLeft />
            </IconButton>
  
            <Card sx={{ padding: 3, margin: 3 ,width:"100%" }}>
              <CardContent>
                <Typography variant="h4" gutterBottom>{packageData.packageName}</Typography>
                <Typography variant="h5">
                  {packageData.packageOffer ? (
                    <>
                      <span style={{ textDecoration: "line-through", color: "gray" }}>₹{packageData.packagePrice}</span> - ₹{packageData.packageDiscountPrice}
                      <span style={{ backgroundColor: "green", color: "white", padding: "5px", borderRadius: "5px", marginLeft: "10px" }}>
                        {Math.floor(((+packageData.packagePrice - +packageData.packageDiscountPrice) / +packageData.packagePrice) * 100)}% Off
                      </span>
                    </>
                  ) : (
                    <span>₹{packageData.packagePrice}</span>
                  )}
                </Typography>
                <Typography color="success.main"><FaMapMarkerAlt /> {packageData.packageDestination}</Typography>
                {(+packageData.packageDays > 0 || +packageData.packageNights > 0) && (
                  <Typography><FaClock /> {packageData.packageDays} Days - {packageData.packageNights} Nights</Typography>
                )}
                {packageData.packageTotalRatings > 0 && (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Rating value={packageData.packageRating || 0} readOnly precision={0.1} />
                    <Typography>({packageData.packageTotalRatings})</Typography>
                  </div>
                )}
                <Typography variant="body1">{packageData.packageDescription}</Typography>
                {
                console.log(packageData)
                }
                <Button variant="contained" color="success" fullWidth onClick={() => navigate(currentUser ? `/booking/${packageData._id}` : "/login")}>Book</Button>
                <Typography variant="h6">Accommodation:</Typography>
                <Typography>{packageData.packageAccommodation}</Typography>
                <Typography variant="h6">Activities:</Typography>
                {/* <Typography>{packageData.packageActivities}</Typography> */}
                <PackageActivitiesView packageData={packageData} />
                <Typography variant="h6">Meals:</Typography>
                <Typography>{packageData.packageMeals}</Typography>
                <Typography variant="h6">Transportation:</Typography>
                <Typography>{packageData.packageTransportation}</Typography>
                {packageRatings && (
                  <div>
                    <Typography variant="h6">Rating/Reviews:</Typography>
                    {!currentUser || ratingGiven ? null : (
                      <>
                        <Rating value={ratingsData.rating} onChange={(e, newValue) => setRatingsData({ ...ratingsData, rating: newValue })} />
                        <textarea
                          rows={3}
                          placeholder="Review"
                          value={ratingsData.review}
                          onChange={(e) => setRatingsData({ ...ratingsData, review: e.target.value })}
                        ></textarea>
                        <Button variant="contained" color="success" onClick={giveRating} disabled={ratingsData.rating === 0 && ratingsData.review === "" || loading}>
                          {loading ? "Loading..." : "Submit"}
                        </Button>
                      </>
                    )}
                    <div>
                      <RatingCard packageRatings={packageRatings} />
                      {packageData.packageTotalRatings > 4 && (
                        <Button variant="outlined" onClick={() => navigate(`/package/ratings/${packageData._id}`)}>View All <FaArrowRight /></Button>
                      )}
                    </div>
                  </div>
                )}
                {!currentUser && (
                  <Button variant="contained" color="success" onClick={() => navigate("/login")}>Rate Package</Button>
                )}
              </CardContent>
            </Card>
          </div>
        )}
        <Snackbar open={copied} autoHideDuration={2000} message="Link copied!" onClose={() => setCopied(false)} />
      </div>
  );
};

export default Package;
