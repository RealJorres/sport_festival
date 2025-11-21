import express from 'express';
import * as ScoreController from '../controllers/scoreController.js';

const router = express.Router();

router.get('/', ScoreController.getAllScores);
router.get('/:id', ScoreController.getScoreById);
router.get('/schedule/:scheduleId', ScoreController.getScoresBySchedule);
router.get('/participant/:participantId', ScoreController.getScoresByParticipant);
router.post('/', ScoreController.createScore);
router.put('/:id', ScoreController.updateScore);
router.delete('/:id', ScoreController.deleteScore);

export default router;