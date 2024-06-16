
const express = require("express")
const { UsersController } = require("../controllers/Users.controller")
const router = express.Router()

router.get("/", UsersController.getAll)
router.get("/:id", UsersController.getById)
router.post("/", UsersController.add)
router.delete("/:id", UsersController.delete)
router.put("/:id", UsersController.edit)

module.exports = router 
