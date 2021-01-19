import express from 'express';
import { body } from 'express-validator';

// Local Imports
import {fetchGroupData, fetchGroups, createGroup } from '../controller/groups-controllers.js';

const router = express.Router();

router.get('/:gid', fetchGroupData);
router.get('/', fetchGroups);
router.post('/', body('title').isLength({ min: 3, max: 12 }), createGroup);

export default router;
