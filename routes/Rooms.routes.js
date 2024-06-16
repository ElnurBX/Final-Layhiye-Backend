
const express = require("express")
const { RoomsController } = require("../controllers/Rooms.controller")
const router = express.Router()

router.get("/", RoomsController.getAll)
router.get("/:id", RoomsController.getById)
router.post("/", RoomsController.add)
router.delete("/:id", RoomsController.delete)
router.put("/:id", RoomsController.edit)

module.exports = router 
