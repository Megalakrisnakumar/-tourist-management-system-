import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  CircularProgress,
  Button,
  TextField,
  Tabs,
  Tab,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Fade,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

const AllPackages = () => {
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
        filter === "offer"
          ? `http://localhost:8000/api/package/get-packages?searchTerm=${search}&offer=true`
          : filter === "latest"
          ? `http://localhost:8000/api/package/get-packages?searchTerm=${search}&sort=createdAt`
          : filter === "top"
          ? `http://localhost:8000/api/package/get-packages?searchTerm=${search}&sort=packageRating`
          : `http://localhost:8000/api/package/get-packages?searchTerm=${search}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data?.success) {
        setPackages(data?.packages);
        setLoading(false);
      } else {
        setLoading(false);
        alert(data?.message || "Something went wrong!");
      }
      setShowMoreBtn(data?.packages?.length > 8);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPackages();
  }, [filter, search]);

  const handleDelete = async (packageId) => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:8000/api/package/delete-package/${packageId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      alert(data?.message);
      getPackages();
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box p={3}>
      <TextField
        fullWidth
        label="Search Packages"
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 2 }}
      />
      
      <Tabs
        value={filter}
        onChange={(e, newValue) => setFilter(newValue)}
        centered
        sx={{ mb: 3 }}
      >
        <Tab label="All" value="all" />
        <Tab label="Offer" value="offer" />
        <Tab label="Latest" value="latest" />
        <Tab label="Top" value="top" />
      </Tabs>
      
      {loading ? (
        <Box display="flex" justifyContent="center" mt={3}>
          <CircularProgress />
        </Box>
      ) : packages.length ? (
        <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={3}>
          {packages.map((pack, i) => (
            <Fade in={true} timeout={500 * (i % 5 + 1)} key={pack._id}>
              <Card sx={{ boxShadow: 5, borderRadius: 3 }}>
                <Link to={`/package/${pack._id}`}>
                  <CardMedia component="img" height="140" image={pack?.packageImages[0]} alt={pack?.packageName} />
                </Link>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {pack?.packageName}
                  </Typography>
                  <Box display="flex" justifyContent="space-between">
                    <Link to={`/admin/update-package/${pack._id}`}>
                      <IconButton color="primary">
                        <Edit />
                      </IconButton>
                    </Link>
                    <IconButton color="error" onClick={() => handleDelete(pack._id)}>
                      <Delete />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Fade>
          ))}
        </Box>
      ) : (
        <Typography textAlign="center" variant="h5">
          No Packages Yet!
        </Typography>
      )}

      {showMoreBtn && (
        <Box display="flex" justifyContent="center" mt={3}>
          <Button variant="contained" color="success" onClick={() => getPackages()}>Show More</Button>
        </Box>
      )}
    </Box>
  );
};

export default AllPackages;