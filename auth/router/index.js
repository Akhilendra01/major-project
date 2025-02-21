const LoginController=require('../controllers/login');
const SignupController=require('../controllers/signup');

const express=require('express');

const router=express.Router();

router.post('/login', LoginController);
router.post('/signup', SignupController);

module.exports=router;