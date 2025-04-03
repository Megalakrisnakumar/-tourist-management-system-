import { Rating, Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import React from "react";
import { FaClock } from "react-icons/fa";
import { Link } from "react-router-dom";
import AnimatedBadge from "../specialofferbadge/badge";

const PackageCard = ({ packageData }) => {
  return (
    <Link to={`/package/${packageData._id}`} style={{ textDecoration: "none" }}>
      <Card
        sx={{
          maxWidth: 345,
          borderRadius: 3,
          boxShadow: 5,
          transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
          '&:hover': {
            transform: "scale(1.05)",
            boxShadow: 10,
          },
        }}
      >
        <CardMedia
          component="img"
          height="220"
          image={packageData.packageImages[0]}
          alt="Package Image"
          sx={{
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            transition: "transform 0.3s ease-in-out",
            '&:hover': {
              transform: "scale(1.1)",
            },
          }}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: "bold" }}>
            {packageData.packageName}
          </Typography>
          <Typography variant="body1" color="success.main">
            {packageData.packageDestination}
          </Typography>
          {(+packageData.packageDays > 0 || +packageData.packageNights > 0) && (
            <Box display="flex" alignItems="center" gap={1} mt={1}>
              <FaClock />
              <Typography variant="body2">
                {+packageData.packageDays > 0 &&
                  (+packageData.packageDays > 1
                    ? packageData.packageDays + " Days"
                    : packageData.packageDays + " Day")}
                {+packageData.packageDays > 0 && +packageData.packageNights > 0 && " - "}
                {+packageData.packageNights > 0 &&
                  (+packageData.packageNights > 1
                    ? packageData.packageNights + " Nights"
                    : packageData.packageNights + " Night")}
              </Typography>
            </Box>
          )}

          {/* Price & Rating */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
            {packageData.packageTotalRatings > 0 && (
              <Box display="flex" alignItems="center" gap={0.5}>
                <Rating
                  value={packageData.packageRating}
                  size="medium"
                  readOnly
                  precision={0.1}
                />
                <Typography variant="body2">({packageData.packageTotalRatings})</Typography>
              </Box>
            )}
            {packageData.offer && packageData.packageDiscountPrice ? (
              <Box display="flex" gap={1} alignItems="center">
                <Typography variant="body2" color="text.secondary" sx={{ textDecoration: "line-through" }}>
                  ${packageData.packagePrice}
                </Typography>
                <Typography variant="h6" color="success.main" sx={{ fontWeight: "bold" }}>
                  ${packageData.packageDiscountPrice}
                </Typography>
              </Box>
            ) : (
              <Typography variant="h6" color="success.main" sx={{ fontWeight: "bold" }}>
                ${packageData.packagePrice}
              </Typography>
            )}

                 {
                  packageData.packageOffer?<AnimatedBadge/>:null
                 } 


          </Box>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PackageCard;