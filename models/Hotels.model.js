
const mongoose = require("mongoose")

const Hotels = mongoose.model("Hotels", new mongoose.Schema({
    title: {
        type: String
    },
}))

module.exports = { Hotels }
