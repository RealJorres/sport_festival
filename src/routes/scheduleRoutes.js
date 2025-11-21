import express from 'express';
import * as ScheduleController from '../controllers/scheduleController.js';

const router = express.Router();

router.get('/', ScheduleController.getAllSchedules);
router.get('/status/:status', ScheduleController.getSchedulesByStatus);
router.get('/:id', ScheduleController.getScheduleById);
router.get('/sport/:sportId', ScheduleController.getSchedulesBySport);
router.post('/', ScheduleController.createSchedule);
router.put('/:id', ScheduleController.updateSchedule);
router.patch('/:id/status', ScheduleController.updateScheduleStatus);
router.delete('/:id', ScheduleController.deleteSchedule);

export default router;