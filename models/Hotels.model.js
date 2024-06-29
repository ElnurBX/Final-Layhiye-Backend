const mongoose = require("mongoose");

const HotelsSchema = new mongoose.Schema({
    title: String,
    mainImg: String,
    imgs: [String],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reviews' }],
    rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rooms' }],
    partners: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Partners' }],
    facilities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Facilities' }],
    rules: [{ key: String, value: String }],
    description: String,
    city:[ { type: mongoose.Schema.Types.ObjectId, ref: 'Citys' }],
    loc: String,
    createdAt: { type: Date, default: Date.now },
    stars: Number,
    youtubeLink: String ,
});

const Hotels = mongoose.model("Hotels", HotelsSchema);

module.exports = { Hotels };
