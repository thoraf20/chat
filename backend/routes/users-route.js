import express from 'express';
import { body } from 'express-validator';

// Local Imports
import controllers from '../controllers/users-controllers';

const router = express.Router();

router.post('/login', body('email').isEmail(), body('password').isLength({ min: 6, max: 20 }), controllers.login);
router.post(
  '/signup',
  body('email').isEmail(),
  body('password').isLength({ min: 6, max: 20 }),
  body('username').isLength({ min: 3, max: 12 }),
  controllers.signup
);
router.put('/edit', body('username').isLength({ min: 3, max: 12 }), controllers.edit);
router.post('/guest', controllers.guest);
router.post('/verify', controllers.verify);

export default router;
