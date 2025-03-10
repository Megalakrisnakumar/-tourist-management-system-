import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Grid, Box } from '@mui/material';
import { motion } from 'framer-motion';
import useFetch from '../../hooks/useFetch';
import { BASE_URL } from '../../utils/config';
import { Link, useNavigate } from 'react-router-dom';

const AccommodationCard = ({ accommodation }) => {
  const location = accommodation.location;
  const googleMapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(location)}`;

  const navigate = useNavigate();

  const handleBookingClick = (accommodation) => {
    navigate(`/book/${accommodation._id}`, { state: accommodation });
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05, boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)' }}
      whileTap={{ scale: 0.95 }}
    >
      <Card sx={{ maxWidth: 345, m: 2, borderRadius: 4, overflow: 'hidden', position: 'relative' }}>
        <CardMedia
          component="img"
          height="200"
          image={`http://localhost:8000/uploads/${accommodation.images[0]}`}
          alt={accommodation.name}
        />
        <CardContent sx={{ textAlign: 'center', backgroundColor: '#f3f4f6' }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            {accommodation.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            {accommodation.location}
          </Typography>
          <Typography variant="h6" color="error" gutterBottom>
            ${accommodation.pricePerNight} / Night
          </Typography>
          <Typography variant="body2" color="textPrimary" gutterBottom>
            Available Rooms: {accommodation.availableRooms}
          </Typography>
          <Box mt={2} display="flex" gap={1} justifyContent="center">
            <Button 
              variant="contained"
              color="success"
              onClick={() => handleBookingClick(accommodation)}
            >
              Book Now
            </Button>

            <Button
              component="a"
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              color="primary"
            >
              Go to Map
            </Button>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Accommodations = () => {
  const { data: Accommodations, loading, error } = useFetch(`${BASE_URL}/accomondation/getAll`);

  return (
    <Grid container spacing={3} justifyContent="center" display={"flex"}>
      {Accommodations?.map((item, index) => (
        <Grid item key={index}>
          <AccommodationCard accommodation={item} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Accommodations;
