const mongoose = require("mongoose");

const CitysSchema = new mongoose.Schema({
    title: String,
    hotels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hotels' }],
    mainImg: String,
    imgs: [String],
    loc: String,
    description: String
});

const Citys = mongoose.model("Citys", CitysSchema);

module.exports = { Citys };
