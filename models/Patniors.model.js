const mongoose = require("mongoose");

const PartnersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    fullname: {
        type: String
    },
    profileImage: {
        type: String 
    },
    hotels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hotels' }],
});

const Partners = mongoose.model("Partners", PartnersSchema);

module.exports = { Partners };
