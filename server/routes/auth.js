import express from 'express';

const router=express.Router();

// middlewares
import { requireSignin } from '../middlewares/index.js';

// controllers====================
import {register,login,logout,currentUser,sendResetLink,verifyUrl,resetPassword,order,verify} from '../controllers/auth.js';
router.post('/register',register);
router.post('/login',login);
router.get("/logout",logout)
router.get('/current-user',requireSignin,currentUser);
// ==============================


// exe controllers================
// const {exe_findUser,exe_updateName,exe_addAllDetails,exe_disableUser,exe_enableUser} =require('../controllers/exe.js');
// router.post('/exe_findU',exe_findUser);
// router.post('/exe_addAllDetails',exe_addAllDetails);
// router.post('/exe_updateName',exe_updateName);
// router.post('/exe_enableUser',exe_enableUser);
// router.post('/exe_disableUser',exe_disableUser);
// ===============================

// forgotPassword============================
// const {sendResetLink,verifyUrl,resetPassword} =require('../controllers/passwordReset.js');
router.post('/password-reset/sendResetLink',sendResetLink);
router.get('/password-reset/verifyUrl/:id/:token',verifyUrl);
router.post('/password-reset/resetPassword/:id/:token',resetPassword);
// ==========================================

// payment===================================
// const {order,verify} =require('../controllers/payment.js');
router.post('/payment/order',requireSignin,order);
router.post('/payment/verify',requireSignin,verify);
// ===========================================
module.exports=router;