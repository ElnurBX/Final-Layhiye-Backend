const mongoose = require("mongoose");

const ReviewsSchema = new mongoose.Schema({
  "name": String,
  "createdDate": { type: Date, default: Date.now },
  "title": String,
  "email": String,
  "cleanliness": Number,
  "communication": Number,
  "checkIn": Number,
  "accuracy": Number,
  "location": Number,
  "value": Number,
  "loc": String,
  "user": {
    "username": String,
    "userImg": String,
    "userId": { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  "likes": [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } }]
});

const Reviews = mongoose.model("Reviews", ReviewsSchema);

module.exports = { Reviews };
