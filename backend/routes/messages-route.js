import express from 'express';

// Local Imports
import {fetchMessages, sendMessage} from '../controller/messages-controllers.js';

const router = express.Router();

router.get('/:gid', fetchMessages);
router.post('/', sendMessage);

export default router;
