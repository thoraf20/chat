import express from 'express';

// Local Imports
import {fetch, report} from '../controller/bugs-controllers.js';

const router = express.Router();

router.get('/', fetch);
router.post('/', report);

export default router;