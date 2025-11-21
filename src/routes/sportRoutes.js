import express from 'express';
import * as SportController from '../controllers/sportController.js';

const router = express.Router();

router.get('/', SportController.getAllSports);
router.get('/:id', SportController.getSportById);
router.post('/', SportController.createSport);
router.put('/:id', SportController.updateSport);
router.delete('/:id', SportController.deleteSport);

export default router;