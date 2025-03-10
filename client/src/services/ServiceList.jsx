import React from 'react';
import { Grid, Card, CardContent, Typography, CardMedia, Box } from '@mui/material';
import { styled } from '@mui/system';

import weatherImg from '../assets/images/weather.png';
import guideImg from '../assets/images/guide.png';
import customizationImg from '../assets/images/customization.png';

const servicesData = [
  {
    imgUrl: guideImg,
    title: 'Best Tour Guide',
    desc: 'Enjoy the tour with the best Tour Guide and leave all the worries with us!',
  },
  {
    imgUrl: weatherImg,
    title: 'Weather Conditions',
    desc: 'Everybody talks about the weather, but nobody does anything about it.',
  },
  {
    imgUrl: customizationImg,
    title: 'Customization',
    desc: 'Tailor your tour experience to match your needs and preferences.',
  },
];

// Styled Card Component
const StyledCard = styled(Card)(({ theme }) => ({
  background: '#767474',
  color:"white",  
  borderRadius: '20px',
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
  },
}));

const ServiceList = () => {
  return (
    <Grid container spacing={3}>
      {servicesData.map((item, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <StyledCard>
            <CardMedia
              component="img"
              height="150"
              image={item.imgUrl}
              alt={item.title}
              sx={{ objectFit: 'contain', padding: '1rem' }}
            />
            <CardContent>
              <Typography variant="h6" align="center" gutterBottom>
                {item.title}
              </Typography>
              <Typography variant="body2" color="white" align="center">
                {item.desc}
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default ServiceList;
