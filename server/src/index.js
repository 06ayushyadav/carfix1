import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import path from "path"

import ConnectDB from "./config/db.js";
import authRoutes from "./routes/auth.route.js"
import adminRoutes from "./routes/admin.route.js";
import mechanicRoutes from "./routes/mechanic.route.js";
import partRoutes from "./routes/gairage/parts.route.js"
import garagesRoutes from "./routes/gairage/emergency.route.js"
import createCard from "./routes/gairage/booking-card.route.js"
import bookingFormRoutes from "./routes/gairage/booking-form.route.js"

dotenv.config();
const app=express();
ConnectDB();

const _dirname=path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"https://carfix1.onrender.com",
    credentials:true
}));


// api routes
app.use('/api/auth', authRoutes);

// mechanic profile
app.use("/api/mechanic", mechanicRoutes);
app.use("/api/parts", partRoutes);
app.use("/api/garages", garagesRoutes);

// mechanic create-booking card
app.use("/api/book",createCard)
app.use("/api/booking-form", bookingFormRoutes);

//
app.use("/api/admin", adminRoutes);

app.use(express.static(path.join(_dirname,"/client/dist")));
app.get("/{*splat}",(req,res)=>{
    res.sendFile(path.resolve(_dirname , "client" , "dist" , "index.html"));
})

app.listen(process.env.PORT,()=>{

    console.log(`Server is running on Port : http://localhost:${process.env.PORT}`)
})