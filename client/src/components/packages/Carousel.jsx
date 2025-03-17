import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { Paper, Box } from '@mui/material';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import Carousel styles

const MuiCarousel = ({ images }) => {
    return (
        <Box sx={{ width: '70%', height:"50%", margin: 'auto' }}>
            <Carousel
                autoPlay
                interval={2000} // Set the interval to 3 seconds
                infiniteLoop // Makes the carousel loop infinitely
                showThumbs={false} // Optional: hides the thumbnail navigation
                showStatus={false} // Optional: hides the slide status (e.g., "1 of 5")
            >
                {
                    images.map((image, index) => {
                        return (
                            <div key={index}>
                                <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
                                    <img height={"600px"} src={image} alt={`Slide ${index + 1}`} />
                                </Paper>
                            </div>
                        );
                    })
                }
            </Carousel>
        </Box> 
    );
};

export default MuiCarousel;
