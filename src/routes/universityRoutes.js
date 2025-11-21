import express from 'express';
import * as UniversityController from '../controllers/universityController.js';

const router = express.Router();

router.get('/', UniversityController.getAllUniversities);
router.get('/:id', UniversityController.getUniversityById);
router.post('/', UniversityController.createUniversity);
router.put('/:id', UniversityController.updateUniversity);
router.delete('/:id', UniversityController.deleteUniversity);

export default router;