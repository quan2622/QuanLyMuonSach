const express = require("express");
const router = express.Router();

const staffController = require("../../controllers/admin/staff.controller");

router.post("/", staffController.create);
// router.put("/:id", staffController.edit);

module.exports = router;
