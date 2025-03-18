import { Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Paper, TextField, Typography, Button, List, ListItem } from "@mui/material";
import { motion } from "framer-motion";

const RatingsReviews = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [showMoreBtn, setShowMoreBtn] = useState(false);
  

  const getPackages = async () => {
    setPackages([]);
    try {
      setLoading(true);
      let url =
        filter === "most" //most rated
          ? `http://localhost:8000/api/package/get-packages?searchTerm=${search}&sort=packageTotalRatings`
          : `http://localhost:8000/api/package/get-packages?searchTerm=${search}&sort=packageRating`; //all
      const res = await fetch(url);
      const data = await res.json();
      if (data?.success) {
        setPackages(data?.packages);
        setLoading(false);
      } else {
        setLoading(false);
        alert(data?.message || "Something went wrong!");
      }
      if (data?.packages?.length > 8) {
        setShowMoreBtn(true);
      } else {
        setShowMoreBtn(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPackages();
  }, [filter, search]);

  const onShowMoreSClick = async () => {
    const numberOfPackages = packages.length;
    const startIndex = numberOfPackages;
    let url =
      filter === "most" //most rated
        ? `http://localhost:8000/api/package/get-packages?searchTerm=${search}&sort=packageTotalRatings&startIndex=${startIndex}`
        : `http://localhost:8000/api/package/get-packages?searchTerm=${search}&sort=packageRating&startIndex=${startIndex}`; //all
    const res = await fetch(url);
    const data = await res.json();
    if (data?.packages?.length < 9) {
      setShowMoreBtn(false);
    }
    setPackages([...packages, ...data?.packages]);
  };

  return (
    <>
        <Paper elevation={6} sx={{ width: "100%", p: 5, borderRadius: 3, display: "flex", flexDirection: "column", gap: 2 }}>
            {loading && <Typography variant="h6" align="center">Loading...</Typography>}
            {packages && (
              <>
                <Box>
                  <TextField
                    fullWidth
                    label="Search"
                    variant="outlined"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </Box>
                <Box my={2} py={2} borderBottom={2} borderTop={2}>
                  <List sx={{ display: "flex", justifyContent: "space-around" }}>
                    <ListItem
                      button
                      selected={filter === "all"}
                      onClick={() => setFilter("all")}
                      sx={{
                        borderRadius: 2,
                        transition: "transform 0.3s",
                        "&:hover": { transform: "scale(0.95)" },
                        bgcolor: filter === "all" ? "primary.main" : "transparent",
                        color: filter === "all" ? "white" : "inherit",
                      }}
                    >
                      All
                    </ListItem>
                    <ListItem
                      button
                      selected={filter === "most"}
                      onClick={() => setFilter("most")}
                      sx={{
                        borderRadius: 2,
                        transition: "transform 0.3s",
                        "&:hover": { transform: "scale(0.95)" },
                        bgcolor: filter === "most" ? "primary.main" : "transparent",
                        color: filter === "most" ? "white" : "inherit",
                      }}
                    >
                      Most Rated
                    </ListItem>
                  </List>
                </Box>
              </>
            )}
            {packages ? (
              packages.map((pack, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "16px",
                    borderBottom: "2px solid #ddd",
                  }}
                >
                  <Link to={`/package/ratings/${pack._id}`}>
                    <img
                      src={pack?.packageImages[0]}
                      alt="image"
                      style={{ width: 80, height: 80, borderRadius: "8px" }}
                    />
                  </Link>
                  <Link to={`/package/ratings/${pack._id}`}>
                    <Typography
                      variant="body1"
                      sx={{ textDecoration: "none", cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
                    >
                      {pack?.packageName}
                    </Typography>
                  </Link>
                  <Typography variant="body1" sx={{ display: "flex", alignItems: "center" }}>
                    <Rating value={pack?.packageRating} precision={0.1} readOnly /> ({pack?.packageTotalRatings})
                  </Typography>
                </motion.div>
              ))
            ) : (
              <Typography variant="h5" align="center">No Ratings Available!</Typography>
            )}
            {showMoreBtn && (
              <Button
                variant="contained"
                color="success"
                sx={{ alignSelf: "center", textTransform: "none" }}
                onClick={onShowMoreSClick}
              >
                Show More
              </Button>
            )}
          </Paper>
    </>
  );
};

export default RatingsReviews;
