import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"

import ConnectDB from "./config/db.js";
import authRoutes from "./routes/auth.route.js"
// import bookingRoutes from "./routes/gairage/booking-services.route.js";
import adminRoutes from "./routes/admin.route.js";
import mechanicRoutes from "./routes/mechanic.route.js";
import partRoutes from "./routes/gairage/parts.route.js"
import garagesRoutes from "./routes/gairage/emergency.route.js"
import createCard from "./routes/gairage/booking-card.route.js"
import bookingFormRoutes from "./routes/gairage/booking-form.route.js"

dotenv.config();
const app=express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

ConnectDB();


// app.get("/",(req,res)=>{
//     res.send("hello CarFix...")
// })

// api routes
app.use('/api/auth', authRoutes);

//

// app.use("/api/bookings", bookingRoutes);
// mechanic profile
app.use("/api/mechanic", mechanicRoutes);
app.use("/api/parts", partRoutes);
app.use("/api/garages", garagesRoutes);

// mechanic create-booking card
app.use("/api/book",createCard)
app.use("/api/booking-form", bookingFormRoutes);

//
app.use("/api/admin", adminRoutes);

app.listen(process.env.PORT,()=>{

    console.log(`Server is running on Port : http://localhost:${process.env.PORT}`)
})