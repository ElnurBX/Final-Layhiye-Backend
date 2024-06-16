const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
require("dotenv").config();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.CONNECTION_STRING).then(() => {
    console.log("connected");
}).catch(err => {
    console.log("Failed to connect to MongoDB", err);
});

app.listen(5000, () => {
    console.log("server running on 5000");
});

const UsersRouter = require("./routes/Users.routes");
app.use("/api/Users", UsersRouter);

const CitysRouter = require("./routes/Citys.routes");
app.use("/api/Citys", CitysRouter);

const PatniorsRouter = require("./routes/Patniors.routes");
app.use("/api/Patniors", PatniorsRouter);

const HotelsRouter = require("./routes/Hotels.routes");
app.use("/api/Hotels", HotelsRouter);

const RoomsRouter = require("./routes/Rooms.routes");
app.use("/api/Rooms", RoomsRouter);

const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);
