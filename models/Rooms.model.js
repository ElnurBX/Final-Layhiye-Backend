const mongoose = require("mongoose");

const RoomsSchema = new mongoose.Schema({
  "title": String,
  "mainImg": String,
  "imgs": [String],
  "size": Number,
  "beds": Number,
  "adults": Number,
  "children": Number,
  "facilities": [{ type: mongoose.Schema.Types.ObjectId, ref: 'Facilities' }],
  "price": Number,
  "city": [{ _id: mongoose.Schema.Types.ObjectId, title: String }],
  "hotels": [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hotels' }]
});

const Rooms = mongoose.model("Rooms", RoomsSchema);

module.exports = { Rooms };
