import express from 'express';
import * as ParticipantController from '../controllers/participantController.js';

const router = express.Router();

router.get('/', ParticipantController.getAllParticipants);
router.get('/:id', ParticipantController.getParticipantById);
router.get('/schedule/:scheduleId', ParticipantController.getParticipantsBySchedule);
router.get('/team/:teamId', ParticipantController.getParticipantsByTeam);
router.post('/', ParticipantController.createParticipant);
router.delete('/:id', ParticipantController.deleteParticipant);

export default router;