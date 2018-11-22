const express = require('express');
const router = express.Router();

const checkAuth = require('../../middleware/chech-auth');

const UserController = require('../controller/users');

router.post('/signup', UserController.signup);

router.post('/signin', UserController.signin);

router.get('/getallusernames',checkAuth, UserController.getAllUsernames);

router.put('/updateusername', checkAuth, UserController.updateUsername);

module.exports = router;