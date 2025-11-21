import Score from '../models/scoreModel.js';

export const getAllScores = async (req, res) => {
  try {
    const scores = await Score.findAll();
    res.json(scores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getScoreById = async (req, res) => {
  try {
    const score = await Score.findById(req.params.id);
    if (!score) {
      return res.status(404).json({ message: 'Score not found' });
    }
    res.json(score);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getScoresBySchedule = async (req, res) => {
  try {
    const scores = await Score.findByScheduleId(req.params.scheduleId);
    res.json(scores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getScoresByParticipant = async (req, res) => {
  try {
    const scores = await Score.findByParticipantId(req.params.participantId);
    res.json(scores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createScore = async (req, res) => {
  try {
    const score = await Score.create(req.body);
    res.status(201).json(score);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateScore = async (req, res) => {
  try {
    const success = await Score.update(req.params.id, req.body);
    if (!success) {
      return res.status(404).json({ message: 'Score not found' });
    }
    const updatedScore = await Score.findById(req.params.id);
    res.json(updatedScore);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteScore = async (req, res) => {
  try {
    const success = await Score.delete(req.params.id);
    if (!success) {
      return res.status(404).json({ message: 'Score not found' });
    }
    res.json({ message: 'Score deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};