const express = require('express');
const router = express.Router();

const LoginController = require('../controllers/login');
const LogoutController = require('../controllers/logout');
const SignupController = require('../controllers/signup');
const ValidateToken = require('../controllers/validateToken');
const verifyEmail = require('../controllers/verifyEmail');

router.post('/login', LoginController);
router.post('/logout', LogoutController);
router.post('/signup', SignupController);
router.post('/validate', ValidateToken);
router.get('/verify-email', verifyEmail); // new verification endpoint

module.exports = router;