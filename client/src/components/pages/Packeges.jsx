import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import PackageCard from "../Cards/pacakgeCard";
import {
  Button,
  TextField,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Container,
  IconButton,
} from "@mui/material";
import { Search, Percent, Star, CalendarToday, BarChart } from "@mui/icons-material";
import { motion } from "framer-motion";

const Packages = () => {
  const navigate = useNavigate();
  const [topPackages, setTopPackages] = useState([]);
  const [latestPackages, setLatestPackages] = useState([]);
  const [offerPackages, setOfferPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const getPackages = async (url, setState) => {
    try {
      setLoading(true);
      const res = await fetch(url);
      const data = await res.json();
      if (data?.success) {
        setState(data?.packages);
      } else {
        alert(data?.message || "Something went wrong!");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPackages("http://localhost:8000/api/package/get-packages?sort=packageRating&limit=8", setTopPackages);
    getPackages("http://localhost:8000/api/package/get-packages?sort=createdAt&limit=8", setLatestPackages);
    getPackages("http://localhost:8000/api/package/get-packages?sort=createdAt&offer=true&limit=6", setOfferPackages);
  }, []);

  return (
    <Container>
      <Box textAlign="center" py={4}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          The Travel Index
        </Typography>
        <Typography variant="subtitle1">
          Make Your Travel Dream Come True With Our Amazing Packages
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" gap={2} my={2}>
        <TextField
          variant="outlined"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: { xs: "80%", sm: "40%" } }}
        />
        <IconButton onClick={() => navigate(`/search?searchTerm=${search}`)}>
          <Search />
        </IconButton>
      </Box>
      <Grid container spacing={2} justifyContent="center" my={2}>
        <Grid item>
          <Button variant="contained" startIcon={<Percent />} onClick={() => navigate("/search?offer=true")}>Best Offers</Button>
        </Grid>
        <Grid item>
          <Button variant="contained" startIcon={<Star />} onClick={() => navigate("/search?sort=packageRating")}>Top Rated</Button>
        </Grid>
        <Grid item>
          <Button variant="contained" startIcon={<CalendarToday />} onClick={() => navigate("/search?sort=createdAt")}>Latest</Button>
        </Grid>
        <Grid item>
          <Button variant="contained" startIcon={<BarChart />} onClick={() => navigate("/search?sort=packageTotalRatings")}>Most Rated</Button>
        </Grid>
      </Grid>
      {loading && (
        <Box textAlign="center" my={4}>
          <CircularProgress />
        </Box>
      )}
      {!loading && (
        <>
          {topPackages.length > 0 && (
            <Box my={4}>
              <Typography variant="h4" fontWeight="bold">Top Packages</Typography>
              <Grid container spacing={3} my={2}>
                {topPackages.map((pkg, i) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                    <PackageCard packageData={pkg} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
          {latestPackages.length > 0 && (
            <Box my={4}>
              <Typography variant="h4" fontWeight="bold">Latest Packages</Typography>
              <Grid container spacing={3} my={2}>
                {latestPackages.map((pkg, i) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                    <PackageCard packageData={pkg} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
          {offerPackages.length > 0 && (
            <Box my={4}>
              <Typography variant="h4" fontWeight="bold">Best Offers</Typography>
              <Grid container spacing={3} my={2}>
                {offerPackages.map((pkg, i) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                    <PackageCard packageData={pkg} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default Packages;
