import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import calculateAvgRating from '../utils/avgRating';
import './tour-card.css';
import { motion } from 'framer-motion';

const TourCard = ({ tour }) => {
    const { _id, title, city, photo, price, featured, reviews, latitude, longitude } = tour;
    const { totalRating, avgRating } = calculateAvgRating(reviews);

    const generateGoogleMapsLink = (latitude, longitude) => {
        return `https://www.google.com/maps?q=${latitude},${longitude}`;
    };

    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            className='tour__card'
            style={{
                borderRadius: '15px',
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                transition: 'transform 0.3s ease-in-out'
            }}
        >
            <Card>
                <Box
                    component="img"
                    src={photo}
                    alt="tour-img"
                    sx={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'cover',
                        position: 'relative'
                    }}
                />
                {featured && (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 10,
                            left: 10,
                            backgroundColor: '#ff5722',
                            color: '#fff',
                            padding: '5px 10px',
                            borderRadius: '8px'
                        }}
                    >
                        Featured
                    </Box>
                )}

                <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="body2" color="text.secondary">
                            <i className="ri-map-pin-line"></i> {city}
                        </Typography>
                        <Typography variant="body2" color="#FFD700">
                            <i className="ri-star-fill"></i> {avgRating || 'Not Rated'}
                            {totalRating > 0 && (<span> ({reviews.length})</span>)}
                        </Typography>
                    </Box>

                    <Typography variant="h6" sx={{ marginTop: 1 }}>
                        <Link to={`/tours/${_id}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>{title}</Link>
                    </Typography>

                    <Box display="flex" justifyContent="space-between" alignItems="center" mt={2} p={2} gap={1}>
                        <Button
                            variant="outlined"
                            color="primary"
                            href={generateGoogleMapsLink(latitude, longitude)}
                            target="_blank"
                            sx={{ textTransform: 'none' }}
                        >
                            View on Map
                        </Button>

                        <Typography variant="h6" color="primary">
                            ₹{price} <span style={{ fontSize: '14px', color: 'grey' }}>/per person</span>
                        </Typography>

                        <Button
                            variant="contained"
                            color="success"
                            component={Link}
                            to={`/tours/${_id}`}
                        >
                            Book Now
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default TourCard;
