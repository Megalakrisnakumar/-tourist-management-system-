import React from 'react';
import { Container, Grid, Typography, Card, CardContent, CardMedia, Button } from '@mui/material';
import heroImg from "../../assets/images/hero-img01.jpg";
import heroImg02 from '../../assets/images/hero-img02.jpg';
import heroVideo from '../../assets/images/hero-video.mp4';
import experienceImg from '../../assets/images/trip.png';
import ServiceList from '../../services/ServiceList';
import FeaturedTourList from '../Featured-tours/FeaturedTourList';
import MasonryImagesGallery from '../Image-gallery/MasonryImagesGallery';
import Testimonials from '../Testimonial/Testimonials';
import Newsletter from '../../shared/Newsletter';
import Accommodations from '../Accomondation/Accomondations';
import MapPage from './mappage';
import Googlemap2 from '../map/googlemap2';

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section style={{ background: 'linear-gradient(135deg, #3a8ef6 30%, #1e3c72 90%)', padding: '60px 0', color: '#fff' }}>
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" fontWeight={700}>Discover the World with Us!</Typography>
              <Typography variant="body1" mt={2}>
                Adventure awaits! Embrace the thrill of new experiences, breathtaking landscapes, and unforgettable moments. Your journey to extraordinary destinations starts here.
              </Typography>
            </Grid>
            <Grid item xs={12} md={2}>
              <img src={heroImg} alt="Travel" style={{ width: '100%', borderRadius: '12px' }} />
            </Grid>
            <Grid item xs={12} md={2}>
              <video src={heroVideo} alt="Scenic Video" controls style={{ width: '100%', borderRadius: '12px' }} />
            </Grid>
            <Grid item xs={12} md={2}>
              <img src={heroImg02} alt="Tour" style={{ width: '100%', borderRadius: '12px' }} />
            </Grid>
          </Grid>
        </Container>
      </section>

      {/* Services Section */}
      <section style={{ padding: '40px 0' }}>
        <Container>
          <Typography variant="h4" textAlign="center" fontWeight={600} mb={3}>Our Services</Typography>
          <ServiceList />
        </Container>
      </section>

      {/* Featured Tours */}
      <section style={{ backgroundColor: '#f4f4f4', padding: '40px 0' }}>
        <Container>
          <Typography variant="h4" textAlign="center" fontWeight={600} mb={3}>Handpicked Tours for You</Typography>
          <FeaturedTourList />
        </Container>
      </section>

      {/* Accommodations */}
      <section>
        <Container>
          <Typography variant="h4" textAlign="center" fontWeight={600} mb={3}>Exclusive Accommodations</Typography>
          <Accommodations />
        </Container>
      </section>

      {/* Testimonials Section */}
      <section style={{ backgroundColor: '#3a8ef6', color: '#fff', padding: '40px 0' }}>
        <Container>
          <Typography variant="h4" textAlign="center" fontWeight={600} mb={3}>Heartfelt Reviews from Happy Customers</Typography>
          <Testimonials />
        </Container>
      </section>

      {/* <MapPage /> */}
      <Googlemap2/>
      <Newsletter />
    </>
  );
};

export default Home;