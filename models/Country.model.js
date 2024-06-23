const mongoose = require("mongoose");

const CountrySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    city: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Citys' }],
    mainImg: String,
});

const Country = mongoose.model("Country", CountrySchema);

module.exports = { Country };
