const express = require("express");
const router = express.Router();

const authController = require("../../controllers/user/auth.controller");

router.post("/signIn", authController.signIn);
router.get("/signOut", authController.signOut);


module.exports = router;
