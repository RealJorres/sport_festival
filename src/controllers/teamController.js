import Team from '../models/teamModel.js';

export const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.findAll();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTeamById = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTeamsByUniversity = async (req, res) => {
  try {
    const teams = await Team.findByUniversityId(req.params.universityId);
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTeamsBySport = async (req, res) => {
  try {
    const teams = await Team.findBySportId(req.params.sportId);
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTeam = async (req, res) => {
  try {
    const team = await Team.create(req.body);
    res.status(201).json(team);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateTeam = async (req, res) => {
  try {
    const success = await Team.update(req.params.id, req.body);
    if (!success) {
      return res.status(404).json({ message: 'Team not found' });
    }
    const updatedTeam = await Team.findById(req.params.id);
    res.json(updatedTeam);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteTeam = async (req, res) => {
  try {
    const success = await Team.delete(req.params.id);
    if (!success) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.json({ message: 'Team deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};