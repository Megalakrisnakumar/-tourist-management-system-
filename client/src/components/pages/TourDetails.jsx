import React, { useEffect, useRef, useState, useContext } from 'react';
import { Container, Grid, Typography, Card, CardContent, CardMedia, Button, TextField, List, ListItem, Avatar, Box, Rating } from '@mui/material';
import { useParams } from 'react-router-dom';
import calculateAvgRating from '../../utils/avgRating';
import avatar from '../../assets/images/avatar.jpg';
import Booking from '../Booking/Booking';
import Newsletter from '../../shared/Newsletter';
import useFetch from '../../hooks/useFetch.js';
import { BASE_URL } from '../../utils/config.js';
import { AuthContext } from '../../context/AuthContext.js';
import MapComponent from '../map/map.jsx';
import { motion } from 'framer-motion';
import GoogleMap from '../map/googlemap.jsx';

const TourDetails = () => {

  const { id } = useParams();
  const reviewMsgRef = useRef('');
  const [tourRating, setTourRating] = useState(null);
  const { user } = useContext(AuthContext);

  const { data: tour, loading, error } = useFetch(`${BASE_URL}/tours/${id}`);
  const { photo, title, desc, price, address, reviews, city, distance, maxGroupSize } = tour;

  const { totalRating, avgRating } = calculateAvgRating(reviews);

  const submitHandler = async e => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;

    try {
      if (!user) {
        alert('Please Sign In!');
        return;
      }

      const reviewObj = {
        username: user?.username,
        reviewText,
        rating: tourRating,
      };

      const res = await fetch(`${BASE_URL}/review/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(reviewObj)
      });

      const result = await res.json();
      alert(result.message);

    } catch (err) {
      alert(err.message);
    }
  };






  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tour]);

  return (
    <Container>
      {loading && <Typography align="center" mt={5}>Loading...</Typography>}
      {error && <Typography align="center" mt={5}>{error}</Typography>}

      {!loading && !error && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}>
              <Card>
                <CardMedia
                  component="img"
                  height="300"
                  image={photo}
                  alt="Tour Image"
                />
                <CardContent>
                  <Typography variant="h4">{title}</Typography>
                  <Typography>{desc}</Typography>
                  <Box mt={2} display="flex" gap={3}>
                    <Typography>📍 {address}</Typography>
                    <Typography>💰 ₹{price}/person</Typography>
                    <Typography>🚶 {distance} km</Typography>
                    <Typography>👥 {maxGroupSize} people</Typography>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>

            <Box mt={4}>
              <Typography variant="h5">Reviews ({reviews?.length})</Typography>
              <form onSubmit={submitHandler}>
                <Rating
                  value={tourRating}
                  onChange={(e, newValue) => setTourRating(newValue)}
                  size="large"
                />
                <TextField
                  inputRef={reviewMsgRef}
                  placeholder="Share your thoughts"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit">
                  Submit
                </Button>
              </form>
              <List>
                {reviews?.map(review => (
                  <ListItem key={review._id}>
                    <Avatar src={avatar} />
                    <Box ml={2}>
                      <Typography variant="h6">{review.username}</Typography>
                      <Typography>{review.reviewText}</Typography>
                      <Rating value={review.rating} readOnly />
                    </Box>
                  </ListItem>
                ))}
              </List>
            </Box>

            {/* <MapComponent /> */}
            <GoogleMap place={address}  />
          </Grid>

          <Grid item xs={12} md={4}>
            <Booking tour={tour} avgRating={avgRating} />
          </Grid>
        </Grid>
      )}

      <Newsletter />
    </Container>
  );
}

export default TourDetails;
