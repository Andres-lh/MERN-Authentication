import express from 'express';
import { protect } from '../middleware/auth.js';
import { getPrivateData } from '../controllers/privateController.js';

const router = express.Router();

router.get("/", protect, getPrivateData);

export default router;