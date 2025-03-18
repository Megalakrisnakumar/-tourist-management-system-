import React, { useEffect, useState } from "react";
import { useNavigate,useLocation  } from "react-router-dom";
import PackageCard from "../Cards/pacakgeCard";
import {
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  Button,
  Typography,
  Grid,
  CircularProgress,
  Container,
  Paper,
} from "@mui/material";
import { motion } from "framer-motion";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sideBarSearchData, setSideBarSearchData] = useState({
    searchTerm: "",
    offer: false,
    sort: "created_at",
    order: "desc",
  });
  const [loading, setLoading] = useState(false);
  const [allPackages, setAllPackages] = useState([]);
  const [showMoreBtn, setShowMoreBtn] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (searchTermFromUrl || offerFromUrl || sortFromUrl || orderFromUrl) {
      setSideBarSearchData({
        searchTerm: searchTermFromUrl || "",
        offer: offerFromUrl === "true",
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }

    const fetchAllPackages = async () => {
      setLoading(true);
      setShowMoreBtn(false);
      try {
        const searchQuery = urlParams.toString();
        const res = await fetch(
          `http://localhost:8000/api/package/get-packages?${searchQuery}`
        );
        const data = await res.json();
        setLoading(false);
        setAllPackages(data?.packages);
        setShowMoreBtn(data?.packages?.length > 8);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllPackages();
  }, [location.search]);

  const handleChange = (e) => {
    const { id, value, checked } = e.target;
    setSideBarSearchData((prev) => ({
      ...prev,
      [id]: id === "offer" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sideBarSearchData.searchTerm);
    urlParams.set("offer", sideBarSearchData.offer);
    urlParams.set("sort", sideBarSearchData.sort);
    urlParams.set("order", sideBarSearchData.order);
    navigate(`/search?${urlParams.toString()}`);
  };

  const onShowMoreSClick = async () => {
    const startIndex = allPackages.length;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`http://localhost:8000/api/package/get-packages?${searchQuery}`);
    const data = await res.json();
    setShowMoreBtn(data?.packages?.length >= 9);
    setAllPackages([...allPackages, ...data?.packages]);
  };

  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Search"
                variant="outlined"
                id="searchTerm"
                value={sideBarSearchData.searchTerm}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <FormControlLabel
                control={<Checkbox id="offer" checked={sideBarSearchData.offer} onChange={handleChange} />}
                label="Offer"
              />
              <Select fullWidth id="sort" value={`${sideBarSearchData.sort}_${sideBarSearchData.order}`} onChange={handleChange} sx={{ mt: 2 }}>
                <MenuItem value="packagePrice_desc">Price high to low</MenuItem>
                <MenuItem value="packagePrice_asc">Price low to high</MenuItem>
                <MenuItem value="packageRating_desc">Top Rated</MenuItem>
                <MenuItem value="packageTotalRatings_desc">Most Rated</MenuItem>
                <MenuItem value="createdAt_desc">Latest</MenuItem>
                <MenuItem value="createdAt_asc">Oldest</MenuItem>
              </Select>
              <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Search</Button>
            </form>
          </Paper>
        </Grid>

        <Grid item xs={12} md={9}>
          <Typography variant="h5" gutterBottom>Package Results:</Typography>
          <Grid container spacing={3}>
            {loading && <CircularProgress sx={{ mx: "auto", mt: 3 }} />}
            {!loading && allPackages.length === 0 && (
              <Typography variant="h6">No Packages Found!</Typography>
            )}
            {!loading &&
              allPackages.map((packageData, i) => (
                <Grid item xs={12} sm={6} md={4} key={i}>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                    <PackageCard packageData={packageData} />
                  </motion.div>
                </Grid>
              ))}
          </Grid>
          {showMoreBtn && (
            <Button onClick={onShowMoreSClick} variant="contained" color="success" sx={{ mt: 2 }}>Show More</Button>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Search;
