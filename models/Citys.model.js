const mongoose = require("mongoose");

const CitysSchema = new mongoose.Schema({
    "title": String,
    "hotels": [
        {
            "title": String,
            "rating": Number,
            "description": String,
            "address": String,
            "mainImage": String,
            "images": [String],
            "facilities": [String]
        }
    ],
    "mainImg": String,
    "imgs": [String],
    "loc": String
});

const Citys = mongoose.model("Citys", CitysSchema);

module.exports = { Citys };
