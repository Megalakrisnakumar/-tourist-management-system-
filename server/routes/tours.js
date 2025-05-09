import express from "express";
import { createTour, deleteTour, getAllTour, getFeaturedTour,
     getSingleTour, getTourBySearch, getTourCount, updateTour } from "../controllers/tourController.js";


const router= express.Router();

import { verifyAdmin } from "../utils/verifyToken.js";
import upload from "../Middleware/fileupload.js";

//create new tour
router.post("/" ,upload.single("photo"), createTour);

//update  tour
router.put("/:id" , updateTour); //verifyAdmin

//delete tour
router.delete("/:id" ,verifyAdmin, deleteTour);

//get single tour
router.get("/:id" , getSingleTour);

//get all tour
router.get("/" , getAllTour);

//get all tour
router.get("/search/getTourBySearch" , getTourBySearch);

//get featured tour
router.get("/search/getFeaturedTours" , getFeaturedTour);

//get tour count
router.get("/search/getTourCount" , getTourCount);



export default router;

