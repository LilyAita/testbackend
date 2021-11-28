const express = require('express');
const router = express.Router();
const user = require("../controllers/auth.controller.js");

router.post( '/',user.signup);
router.route('/login/').post(user.login).delete(user.logout);
router.route('/refresh/').post(user.refreshToken);
module.exports = router;