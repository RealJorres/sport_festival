import express from 'express';
import userRoutes from './userRoutes.js';
import universityRoutes from './universityRoutes.js';
import sportRoutes from './sportRoutes.js';
import teamRoutes from './teamRoutes.js';
import scheduleRoutes from './scheduleRoutes.js';
import participantRoutes from './participantRoutes.js';
import scoreRoutes from './scoreRoutes.js';
import medalRoutes from './medalRoutes.js';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/universities', universityRoutes);
router.use('/sports', sportRoutes);
router.use('/teams', teamRoutes);
router.use('/schedules', scheduleRoutes);
router.use('/participants', participantRoutes);
router.use('/scores', scoreRoutes);
router.use('/medals', medalRoutes);

export default router;