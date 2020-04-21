var express = require('express');
var router = express.Router();
var userMiddle = require('../middleware/userMiddle.js');
var userController = require('../controllers/userController');

/* GET users listing. */
router.post('/register', userMiddle.validateRegistration, userController.register);
router.post('/login', userMiddle.validateLogin, userController.login);
router.get('/', userMiddle.validateToken, userController.getUsers)
module.exports = router;
