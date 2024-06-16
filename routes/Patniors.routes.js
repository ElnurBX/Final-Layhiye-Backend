
const express = require("express")
const { PatniorsController } = require("../controllers/Patniors.controller")
const router = express.Router()

router.get("/", PatniorsController.getAll)
router.get("/:id", PatniorsController.getById)
router.post("/", PatniorsController.add)
router.delete("/:id", PatniorsController.delete)
router.put("/:id", PatniorsController.edit)

module.exports = router 
