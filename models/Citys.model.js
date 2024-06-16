
const mongoose = require("mongoose")

const Citys = mongoose.model("Citys", new mongoose.Schema({
    title: {
        type: String
    },
}))

module.exports = { Citys }
