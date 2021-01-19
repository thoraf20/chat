import express from 'express';
import { body } from 'express-validator';

// Local Imports
import {login, signup, edit, guest, verify} from '../controller/users-controllers.js';

const router = express.Router();

router.post('/login', body('email').isEmail(), body('password').isLength({ min: 6, max: 20 }), login);
router.post(
  '/signup',
  body('email').isEmail(),
  body('password').isLength({ min: 6, max: 20 }),
  body('username').isLength({ min: 3, max: 12 }),
  signup
);
router.put('/edit', body('username').isLength({ min: 3, max: 12 }), edit);
router.post('/guest', guest);
router.post('/verify', verify);

export default router;
