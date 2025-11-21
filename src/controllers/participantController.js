import Participant from '../models/participantModel.js';

export const getAllParticipants = async (req, res) => {
  try {
    const participants = await Participant.findAll();
    res.json(participants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getParticipantById = async (req, res) => {
  try {
    const participant = await Participant.findById(req.params.id);
    if (!participant) {
      return res.status(404).json({ message: 'Participant not found' });
    }
    res.json(participant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getParticipantsBySchedule = async (req, res) => {
  try {
    const participants = await Participant.findByScheduleId(req.params.scheduleId);
    res.json(participants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getParticipantsByTeam = async (req, res) => {
  try {
    const participants = await Participant.findByTeamId(req.params.teamId);
    res.json(participants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createParticipant = async (req, res) => {
  try {
    const participant = await Participant.create(req.body);
    res.status(201).json(participant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteParticipant = async (req, res) => {
  try {
    const success = await Participant.delete(req.params.id);
    if (!success) {
      return res.status(404).json({ message: 'Participant not found' });
    }
    res.json({ message: 'Participant deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};