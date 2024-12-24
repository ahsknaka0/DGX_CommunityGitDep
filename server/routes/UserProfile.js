import express from "express";
// import { fetchUser } from '../middleware/fetchUser.js';
import { fetchUser } from '../middleware/fetchUser.js';
import { profileDetail, getUserDiscussion } from "../controllers/userProfile.js";

const router = express.Router();

router.post('/profileDetail', fetchUser, profileDetail)
router.post('/getUserDiscussion', fetchUser, getUserDiscussion)


export default router;