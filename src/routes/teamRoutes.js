import express from 'express';
import * as TeamController from '../controllers/teamController.js';

const router = express.Router();

router.get('/', TeamController.getAllTeams);
router.get('/:id', TeamController.getTeamById);
router.get('/university/:universityId', TeamController.getTeamsByUniversity);
router.get('/sport/:sportId', TeamController.getTeamsBySport);
router.post('/', TeamController.createTeam);
router.put('/:id', TeamController.updateTeam);
router.delete('/:id', TeamController.deleteTeam);

export default router;