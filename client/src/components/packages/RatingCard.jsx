import React, { useState } from "react";
import { Rating, Card, CardContent, Avatar, Typography, Dialog, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import { FaArrowDown, FaArrowUp, FaTimes } from "react-icons/fa";

const RatingCard = ({ packageRatings }) => {
  const [openReview, setOpenReview] = useState(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {packageRatings?.map((rating, i) => (
        <motion.div
          key={i}
          style={{ width: '100%' }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Card style={{ borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '16px', border: '1px solid #e0e0e0' }}>
            <CardContent style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Avatar src={rating.userProfileImg} alt={rating.username[0]} />
                <Typography variant="h6" style={{ fontWeight: '600' }}>
                  {rating.username}
                </Typography>
              </div>
              <Rating value={rating.rating || 0} readOnly size="small" precision={0.1} />
              <Typography variant="body2" style={{ color: '#4a4a4a' }}>
                {rating.review.length > 90 ? rating.review.substring(0, 45) + "..." : rating.review || (rating.rating < 3 ? "Not Bad" : "Good")}
              </Typography>
              {rating.review.length > 90 && (
                <button
                  style={{ color: '#1976d2', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500', border: 'none', background: 'none', cursor: 'pointer' }}
                  onClick={() => setOpenReview(i)}
                >
                  More <FaArrowDown />
                </button>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}

      {/* Full Review Popup */}
      <Dialog open={openReview !== null} onClose={() => setOpenReview(null)}>
        {openReview !== null && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ padding: '16px', width: '320px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" style={{ fontWeight: '600' }}>
                {packageRatings[openReview].username}
              </Typography>
              <IconButton onClick={() => setOpenReview(null)}>
                <FaTimes />
              </IconButton>
            </div>
            <Rating value={packageRatings[openReview].rating || 0} readOnly size="small" precision={0.1} />
            <Typography variant="body1" style={{ marginTop: '8px', color: '#4a4a4a' }}>
              {packageRatings[openReview].review}
            </Typography>
          </motion.div>
        )}
      </Dialog>
    </div>
  );
};

export default RatingCard;