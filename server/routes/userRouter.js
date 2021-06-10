import express from 'express';
import { register, login, resetPassword, forgotPassword } from '../controllers/userController.js' 

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resetToken', resetPassword);


export default router;