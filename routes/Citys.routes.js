
const express = require("express")
const { CitysController } = require("../controllers/Citys.controller")
const router = express.Router()

router.get("/", CitysController.getAll)
router.get("/:id", CitysController.getById)
router.post("/", CitysController.add)
router.delete("/:id", CitysController.delete)
router.put("/:id", CitysController.edit)

module.exports = router 
