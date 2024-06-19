
const express = require("express")
const { FacilitiesController } = require("../controllers/Facilities.controller")
const router = express.Router()

router.get("/", FacilitiesController.getAll)
router.get("/:id", FacilitiesController.getById)
router.post("/", FacilitiesController.add)
router.delete("/:id", FacilitiesController.delete)
router.put("/:id", FacilitiesController.edit)

module.exports = router 
