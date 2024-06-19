const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the "uploads" directory
app.use('/uploads/profiles', express.static('uploads/profiles'));
app.use('/uploads/citys', express.static('uploads/citys'));
app.use('/uploads/users', express.static('uploads/users')); // Profil fotoğrafları için ekleme
app.use('/uploads/hotels', express.static('uploads/Hotels'));
app.use('/uploads/rooms', express.static('uploads/Rooms'));
app.use('/uploads/Facilities', express.static('uploads/Facilities'));
// Connect to MongoDB
mongoose.connect(process.env.CONNECTION_STRING)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Failed to connect to MongoDB", err);
    });

// Import Routes
const UsersRouter = require("./routes/Users.routes");
const CitysRouter = require("./routes/Citys.routes");
const PatniorsRouter = require("./routes/Patniors.routes");
const HotelsRouter = require("./routes/Hotels.routes");
const RoomsRouter = require("./routes/Rooms.routes");
const authRoutes = require("./routes/auth.routes");
const multerRouter = require("./routes/multer.routes");
const ReviewsRouter = require("./routes/Reviews.routes");
const FacilitiesRouter = require("./routes/Facilities.routes");

// Use Routes
app.use("/api/Users", UsersRouter);
app.use("/api/Citys", CitysRouter);
app.use("/api/Patniors", PatniorsRouter);
app.use("/api/Hotels", HotelsRouter);
app.use("/api/Rooms", RoomsRouter);
app.use("/api/auth", authRoutes);
app.use("/api/Reviews", ReviewsRouter);
app.use("/api/Facilities", FacilitiesRouter);

// Multer Routes
app.use("/api/upload", multerRouter);

// Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
