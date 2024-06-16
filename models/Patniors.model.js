
const mongoose = require("mongoose")

const Patniors = mongoose.model("Patniors", new mongoose.Schema({
    title: {
        type: String
    },
}))

module.exports = { Patniors }
