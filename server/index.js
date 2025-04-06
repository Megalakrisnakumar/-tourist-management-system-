import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import tourRoute  from './routes/tours.js'
import userRoute from './routes/users.js'
import authRoute from './routes/auth.js'
import reviewRoute from './routes/review.js'
import bookingRoute from './routes/bookings.js'

import accoRoute from "./routes/accomondations.js"
import { GetAllDashbard } from './controllers/dashboard.js'

import packageRoute from "./routes/package.route.js";
import packagebookingRoute from "./routes/booking.route.js";
import packageratingRoute from "./routes/rating.route.js";
import upload from './Middleware/fileupload.js'
import customizeTourBookingRoutes  from'./routes/customizeTourBookingRoutes.js';
import { sendConfirmMail } from './controllers/customizeTourBookingController.js'



dotenv.config();


const app = express()
const port = process.env.PORT || 8000;

const corsOptions = {
    origin:true,
    credentials:true
}


mongoose.set("strictQuery", false);
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI ,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Is connected successfully');
    } catch (err) {
        console.log('MongoDB Connection failed');
    }
};



app.get("/", (req, res) => {
    res.send("api is working");
})



//middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));
app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload an image' });
    }
    res.json({ message: 'Image uploaded successfully', file: req.file });
  });

app.use("/api/v1/auth" ,  authRoute);
app.use("/api/v1/tours" , tourRoute);
app.use("/api/v1/users" , userRoute);
app.use("/api/v1/review" , reviewRoute);
app.use("/api/v1/booking" , bookingRoute);
app.use("/api/v1/accomondation" , accoRoute);
app.get("/dashboard",GetAllDashbard);
app.use("/api/package", packageRoute);
app.use("/api/package/booking", packagebookingRoute);
app.use("/api/package/rating", packageratingRoute);
app.use('/api/customize-tour-bookings', customizeTourBookingRoutes);
app.post("/api/send-confirm-email",sendConfirmMail)




//http://localhost:8000/api/v1/accomondationbooking/booking/:id




app.listen(port, () => {
    connect();
    console.log('Server listening on Port', port);
})