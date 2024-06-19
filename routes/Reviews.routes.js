
const express = require("express")
const { ReviewsController } = require("../controllers/Reviews.controller")
const router = express.Router()

router.get("/", ReviewsController.getAll)
router.get("/:id", ReviewsController.getById)
router.post("/", ReviewsController.add)
router.delete("/:id", ReviewsController.delete)
router.put("/:id", ReviewsController.edit)

module.exports = router 
