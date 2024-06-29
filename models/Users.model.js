const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
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
    verify: {
        type: Boolean,
        default: false
    },
    verifyToken: {
        type: String
    },
    role: {
        type: String,
        enum: ['user', 'partner', 'admin'],
        default: 'user'
    },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reviews' }],
    Wishlists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hotels' }]
});

const User = mongoose.model("User", UserSchema);

module.exports = { User };
