const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

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

// Use Routes
app.use("/api/Users", UsersRouter);
app.use("/api/Citys", CitysRouter);
app.use("/api/Patniors", PatniorsRouter);
app.use("/api/Hotels", HotelsRouter);
app.use("/api/Rooms", RoomsRouter);
app.use("/api/auth", authRoutes);

// Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
