const express = require("express");
const router = express.Router();

const userController = require("../../controllers/user/user.controller");

router.post("/create", userController.create);

module.exports = router;
