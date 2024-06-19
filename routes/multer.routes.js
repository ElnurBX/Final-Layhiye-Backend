const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const { uploadImage } = require("../controllers/multer.controller");

// Image upload routes
router.post("/:model/:id", upload, uploadImage);

module.exports = router;
