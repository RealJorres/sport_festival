import express from 'express';
import * as MedalController from '../controllers/medalController.js';

const router = express.Router();
router.get('/', MedalController.getAllMedals);
router.get('/tally', MedalController.getMedalTally);
router.get('/schedule/:scheduleId', MedalController.getMedalsBySchedule);
router.get('/university/:universityId', MedalController.getMedalsByUniversity);
router.get('/:id', MedalController.getMedalById);

router.post('/', MedalController.createMedal);
router.put('/:id', MedalController.updateMedal);
router.delete('/:id', MedalController.deleteMedal);

export default router;