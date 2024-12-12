const express = require("express");
const router = express.Router();

const userController = require("../controllers/users.controller");

router.post("/users", userController.createUser);
router.post("/login", userController.login);


module.exports = router;
