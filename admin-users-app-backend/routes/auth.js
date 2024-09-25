const express = require("express");
const router = express.Router();
const aunthController = require("../controllers/authController");

router.post("/", aunthController.loginUser);

module.exports = router;
