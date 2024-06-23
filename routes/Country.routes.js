
const express = require("express")
const { CountryController } = require("../controllers/Country.controller")
const router = express.Router()

router.get("/", CountryController.getAll)
router.get("/:id", CountryController.getById)
router.post("/", CountryController.add)
router.delete("/:id", CountryController.delete)
router.put("/:id", CountryController.edit)

module.exports = router 
