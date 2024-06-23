const mongoose = require("mongoose");

const FacilitiesSchema = new mongoose.Schema({
    title: String,
    logo: String
});

const Facilities = mongoose.model("Facilities", FacilitiesSchema);

module.exports = { Facilities };
