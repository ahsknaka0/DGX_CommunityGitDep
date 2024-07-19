import express from "express";
import { body } from 'express-validator';
import { fetchUser } from '../middleware/fetchUser.js';

import {

  login,
  registration,
  getuser,
  databaseUserVerification,
  changePassword,
  sendInvite,
  passwordRecovery,
  resetPassword

} from "../controllers/user.js";

const router = express.Router();

router.post('/verify', [
  body('email', 'Enter a valid email').isEmail()
], databaseUserVerification)

router.post('/registration', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password at least 5 character').isLength({ min: 5 })
], registration);

router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password can not be blank').exists()
], login);

router.post('/changePassword', [
  body('currentPassword', 'Password can not be blank').exists(),
  body('newPassword', 'New Password can not be blank').exists()
], fetchUser, changePassword)

router.get('/getuser', fetchUser, getuser)

router.post('/sendinvite', [
  body('email', 'Enter a valid email').isEmail()
], fetchUser, sendInvite)

router.post('/passwordrecovery', [
  body('email', 'Enter a valid email').isEmail()
], passwordRecovery)

router.post('/resetpassword', [
  body('email', 'Enter a valid email').isEmail(),
  body('signature', 'New Password can not be blank').exists(),
  body('password', 'New Password can not be blank').exists()
], resetPassword)



export default router;