const express = require('express')
const router = express.Router()
const loginController = require('../controller/loginDetails')


router.post("/login", loginController.login)
router.post("/register", loginController.register)

module.exports = router;
