const mongoose = require("mongoose");

const RoomsSchema = new mongoose.Schema({
    title: String,
    mainImg: String,
    imgs: [String],
    size: Number,
    beds: Number,
    adults: Number,
    children: Number,
    description: String,
    facilities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Facilities' }],
    price: Number,
    city: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Citys' }],
    hotel: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hotels' }]
});

const Rooms = mongoose.model("Rooms", RoomsSchema);

module.exports = { Rooms };
