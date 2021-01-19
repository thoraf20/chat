import express from 'express';

// Local Imports
const controllers = require('../controllers/messages-controllers');

const router = express.Router();

router.get('/:gid', controllers.fetchMessages);
router.post('/', controllers.sendMessage);

export default router;
