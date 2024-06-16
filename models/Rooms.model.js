
const mongoose = require("mongoose")

const Rooms = mongoose.model("Rooms", new mongoose.Schema({
    title: {
        type: String
    },
}))

module.exports = { Rooms }
