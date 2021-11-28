const express = require('express');
const router = express.Router();
const geo = require("../controllers/geo.controller.js");

router.get( '/',geo.restaurants);
module.exports = router;