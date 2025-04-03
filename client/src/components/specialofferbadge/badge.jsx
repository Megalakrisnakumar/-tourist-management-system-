import React from "react";
import { Badge, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const AnimatedBadge = () => {
  return (
    <div style={{marginRight:"20px"}}>
        <motion.div
      initial={{ scale: 1 }}
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      className="flex items-center justify-center"
    >
      <Badge
        badgeContent={
          <Typography
            variant="caption"
            className="text-white font-bold"
            style={{
              background: "red",
              borderRadius: "50%",
              padding: "6px 10px",
            }}
          >
            Offer
          </Typography>
        }
        overlap="circular"
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Star size={48} className="text-yellow-500" />
      </Badge>
    </motion.div>
    </div>
  );
};

export default AnimatedBadge;
