import express from 'express';

// Local Imports
const controllers = require('../controllers/bugs-controllers');

const router = express.Router();

router.get('/', controllers.fetch);
router.post('/', controllers.report);

export default router;