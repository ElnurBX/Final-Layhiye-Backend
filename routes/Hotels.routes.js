
const express = require("express")
const { HotelsController } = require("../controllers/Hotels.controller")
const router = express.Router()

router.get("/", HotelsController.getAll)
router.get("/:id", HotelsController.getById)
router.post("/", HotelsController.add)
router.delete("/:id", HotelsController.delete)
router.put("/:id", HotelsController.edit)

module.exports = router 
