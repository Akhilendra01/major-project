const LoginController=require('../controllers/login');
const LogoutController=require('../controllers/logout');
const SignupController=require('../controllers/signup');

const express=require('express');

const router=express.Router();

router.post('/login', LoginController);
router.post('/logout', LogoutController);
router.post('/signup', SignupController);

module.exports=router;