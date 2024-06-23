
const express = require("express")
const { PartnersController } = require("../controllers/Patniors.controller")
const router = express.Router()

router.get("/", PartnersController.getAll)
router.get("/:id", PartnersController.getById)
router.post("/", PartnersController.add)
router.delete("/:id", PartnersController.delete)
router.put("/:id", PartnersController.edit)

module.exports = router 
