const express = require('express')
const router = express.Router()
const loginController = require('../controller/loginDetails')
const validation = require('../middleware/validation')
const helper = require('../middleware/helper.js')

// image upload 
const multer = require("multer");
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


router.post('/login', validation.adminLoginValidation, loginController.login)
router.post('/register', validation.adminValidation, loginController.register)
router.post("/imageupload", helper.Authorization, upload.single('file', 'filePath'), loginController.imageUpload)

module.exports = router;
