import React from 'react';
import Tourcard from '../../shared/Tourcard';
import { Col, Grid, Card, CardContent, Typography, CircularProgress, Box } from '@mui/material';
import useFetch from "../../hooks/useFetch.js";
import { BASE_URL } from "../../utils/config.js";
import { motion } from 'framer-motion';

const FeaturedTourList = () => {
  const { data: featuredTours, loading, error } = useFetch(`${BASE_URL}/tours?page=${0}`);

  return (
    <Grid container spacing={3}>
      {loading && (
        <Box display="flex" justifyContent="center" width="100%" mt={3}>
          <CircularProgress color="primary" />
        </Box>
      )}
      {error && (
        <Box display="flex" justifyContent="center" width="100%" mt={3}>
          <Typography color="error">{error}</Typography>
        </Box>
      )}

      {!loading && !error && featuredTours?.map(tour => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={tour._id}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <Card sx={{ boxShadow: 3, borderRadius: 3, overflow: 'hidden' }}>
              <CardContent>
                <Tourcard tour={tour} />
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
};

export default FeaturedTourList;
