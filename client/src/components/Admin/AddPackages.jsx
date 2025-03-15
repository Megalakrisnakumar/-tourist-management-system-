import React, { useState } from "react";
import axios from 'axios'
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel, CircularProgress, IconButton, Box, Typography, Grid, Fade } from "@mui/material";
import { CloudUpload, Delete } from "@mui/icons-material";



const AddPackages = () => {
  const [formData, setFormData] = useState({
    packageName: "",
    packageDescription: "",
    packageDestination: "",
    packageDays: 1,
    packageNights: 1,
    packageAccommodation: "",
    packageTransportation: "",
    packageMeals: "",
    packageActivities: "",
    packagePrice: 500,
    packageDiscountPrice: 0,
    packageOffer: false,
    packageImages: [],
  });
  const [images, setImages] = useState([]);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageUploadPercent, setImageUploadPercent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  




  const handleUpload = async () => {
   

    console.log(images);
    
    for(let i=0;i<images.length;i++){
    
        const formDatas = new FormData();
        formDatas.append("image", images[i]);
    
        try {
    
          
    
          const response = await axios.post("http://localhost:8000/upload", formDatas, {
            headers: { "Content-Type": "multipart/form-data" },
          });
    
          console.log(response.data);
  
          setFormData({...formData,packageImages:formData.packageImages.concat(`http://localhost:8000/uploads/${response.data.file.filename}`)})
          
    
        
          console.log(response.data);
          setLoading(false);
        } catch (error) {
         
          console.error(error);
        }
    
    }

   

  
  };



  const handleDeleteImage = (index) => {
    setFormData({
      ...formData,
      packageImages: formData.packageImages.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {

    console.log(formData.packageImages);
    
    e.preventDefault();
    if (formData.packageImages.length === 0) {
      alert("You must upload atleast 1 image");
      return;
    }
    if (
      formData.packageName === "" ||
      formData.packageDescription === "" ||
      formData.packageDestination === "" ||
      formData.packageAccommodation === "" ||
      formData.packageTransportation === "" ||
      formData.packageMeals === "" ||
      formData.packageActivities === "" ||
      formData.packagePrice === 0
    ) {
       alert("All fields are required!");
      return;
    }
    if (formData.packagePrice < 0) {
      alert("Price should be greater than 500!");
      return;
    }
    if (formData.packageDiscountPrice >= formData.packagePrice) {
      alert("Regular Price should be greater than Discount Price!");
      return;
    }
    if (formData.packageOffer === false) {
      setFormData({ ...formData, packageDiscountPrice: 0 });
    }
    // console.log(formData);
    try {
      setLoading(true);
      setError(false);

      const res = await fetch("http://localhost:8000/api/package/create-package", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data?.success === false) {
        setError(data?.message);
        setLoading(false);
      }
      setLoading(false);
      setError(false);
      alert(data?.message);
      setFormData({
        packageName: "",
        packageDescription: "",
        packageDestination: "",
        packageDays: 1,
        packageNights: 1,
        packageAccommodation: "",
        packageTransportation: "",
        packageMeals: "",
        packageActivities: "",
        packagePrice: 500,
        packageDiscountPrice: 0,
        packageOffer: false,
        packageImages: [],
      });
      setImages([]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
       <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', p: 3 }}>
           <form
           
             style={{
               width: "80%",
               background: "#fff",
               borderRadius: "10px",
               boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
               padding: "2rem",
               display: "flex",
               flexDirection: "column",
               alignItems: "center",
             }}
           >
             <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>Add Package</Typography>
     
             <Fade in={true} timeout={1000}>
               <TextField
                 label="Name"
                 name="packageName"
                 value={formData.packageName}
                 onChange={handleChange}
                 fullWidth
                 variant="outlined"
                 sx={{ mb: 2 }}
               />
             </Fade>
     
             <Fade in={true} timeout={1000}>
               <TextField
                 label="Description"
                 name="packageDescription"
                 value={formData.packageDescription}
                 onChange={handleChange}
                 fullWidth
                 multiline
                 rows={4}
                 variant="outlined"
                 sx={{ mb: 2 }}
               />
             </Fade>
     
             <Grid container spacing={2} sx={{ mb: 2 }}>
               <Grid item xs={6}>
                 <Fade in={true} timeout={1000}>
                   <TextField
                     label="Destination"
                     name="packageDestination"
                     value={formData.packageDestination}
                     onChange={handleChange}
                     fullWidth
                     variant="outlined"
                   />
                 </Fade>
               </Grid>
               <Grid item xs={6}>
                 <Fade in={true} timeout={1000}>
                   <TextField
                     label="Days"
                     name="packageDays"
                     type="number"
                     value={formData.packageDays}
                     onChange={handleChange}
                     fullWidth
                     variant="outlined"
                   />
                 </Fade>
               </Grid>
             </Grid>
     
             <Grid container spacing={2} sx={{ mb: 2 }}>
               <Grid item xs={6}>
                 <Fade in={true} timeout={1000}>
                   <TextField
                     label="Nights"
                     name="packageNights"
                     type="number"
                     value={formData.packageNights}
                     onChange={handleChange}
                     fullWidth
                     variant="outlined"
                   />
                 </Fade>
               </Grid>
               <Grid item xs={6}>
                 <Fade in={true} timeout={1000}>
                   <TextField
                     label="Accommodation"
                     name="packageAccommodation"
                     value={formData.packageAccommodation}
                     onChange={handleChange}
                     fullWidth
                     multiline
                     rows={2}
                     variant="outlined"
                   />
                 </Fade>
               </Grid>
             </Grid>
     
             <Fade in={true} timeout={1000}>
               <FormControl fullWidth sx={{ mb: 2 }}>
                 <InputLabel>Transportation</InputLabel>
                 <Select
                   label="Transportation"
                   name="packageTransportation"
                   value={formData.packageTransportation}
                   onChange={handleChange}
                   variant="outlined"
                 >
                   <MenuItem value="Flight">Flight</MenuItem>
                   <MenuItem value="Train">Train</MenuItem>
                   <MenuItem value="Boat">Boat</MenuItem>
                   <MenuItem value="Other">Other</MenuItem>
                 </Select>
               </FormControl>
             </Fade>
     
             <Fade in={true} timeout={1000}>
               <TextField
                 label="Meals"
                 name="packageMeals"
                 value={formData.packageMeals}
                 onChange={handleChange}
                 fullWidth
                 multiline
                 rows={2}
                 variant="outlined"
                 sx={{ mb: 2 }}
               />
             </Fade>
     
             <Fade in={true} timeout={1000}>
               <TextField
                 label="Activities"
                 name="packageActivities"
                 value={formData.packageActivities}
                 onChange={handleChange}
                 fullWidth
                 multiline
                 rows={2}
                 variant="outlined"
                 sx={{ mb: 2 }}
               />
             </Fade>
     
             <Fade in={true} timeout={1000}>
               <TextField
                 label="Price"
                 name="packagePrice"
                 type="number"
                 value={formData.packagePrice}
                 onChange={handleChange}
                 fullWidth
                 variant="outlined"
                 sx={{ mb: 2 }}
               />
             </Fade>
     
             <FormControlLabel
               control={<Checkbox checked={formData.packageOffer} onChange={handleChange} name="packageOffer" />}
               label="Offer"
               sx={{ mb: 2 }}
             />
     
             {formData.packageOffer && (
               <Fade in={true} timeout={1000}>
                 <TextField
                   label="Discount Price"
                   name="packageDiscountPrice"
                   type="number"
                   value={formData.packageDiscountPrice}
                   onChange={handleChange}
                   fullWidth
                   variant="outlined"
                   sx={{ mb: 2 }}
                 />
               </Fade>
             )}
     
             <Fade in={true} timeout={1000}>
               <Box sx={{ mb: 2 }}>
                 <Typography variant="body2" color="textSecondary">
                   Images (max 5 images, size less than 2MB each)
                 </Typography>
                 <input
                   type="file"
                   id="packageImages"
                   multiple
                   onChange={(e) => setImages(e.target.files)}
                   style={{ display: "none" }}
                 />
                 <label htmlFor="packageImages">
                   <Button variant="contained" color="primary" startIcon={<CloudUpload />} component="span">
                     Upload Images
                   </Button>
                 </label>
               </Box>
             </Fade>
     
             <Fade in={true} timeout={1000}>
               <Button
                 variant="contained"
                 color="success"
                 fullWidth
                 onClick={handleUpload}
                 disabled={uploading}
                 sx={{ mb: 2 }}
               >
                 {uploading ? <CircularProgress size={24} /> : "Upload Images"}
               </Button>
             </Fade>
     
             <Fade in={true} timeout={1000}>
               <Button
                 variant="contained"
                 color="primary"
                 fullWidth
              
                 sx={{ mb: 2 }}
                 onClick={handleSubmit}
               >
                 {loading ? <CircularProgress size={24} /> : "Add Package"}
               </Button>
             </Fade>
     
             {formData.packageImages.length > 0 && (
               <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                 {Array.from(formData.packageImages).map((image, i) => (
                   <Box key={i} sx={{ position: 'relative', mb: 2 }}>
                     <img src={image} alt="" style={{ height: "80px", width: "80px", borderRadius: "8px", marginRight: "10px" }} />
                     <IconButton onClick={() => handleDeleteImage(i)} sx={{ position: "absolute", top: "0", right: "0", color: "red" }}>
                       <Delete />
                     </IconButton>
                   </Box>
                 ))}
               </Box>
             )}
           </form>
         </Box>
    </>
  );
};

export default AddPackages;
