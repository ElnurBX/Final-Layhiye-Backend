const express = require("express");
const { UserController } = require("../controllers/Users.controller");
const router = express.Router();

router.get("/", UserController.getAll);
router.get("/:id", UserController.getById);
router.post("/", UserController.add);
router.delete("/:id", UserController.delete);
router.put("/:id", UserController.edit);

module.exports = router;
