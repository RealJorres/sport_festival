import Sport from '../models/sportModel.js';

export const getAllSports = async (req, res) => {
  try {
    const sports = await Sport.findAll();
    res.json(sports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSportById = async (req, res) => {
  try {
    const sport = await Sport.findById(req.params.id);
    if (!sport) {
      return res.status(404).json({ message: 'Sport not found' });
    }
    res.json(sport);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createSport = async (req, res) => {
  try {
    const sport = await Sport.create(req.body);
    res.status(201).json(sport);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateSport = async (req, res) => {
  try {
    const success = await Sport.update(req.params.id, req.body);
    if (!success) {
      return res.status(404).json({ message: 'Sport not found' });
    }
    const updatedSport = await Sport.findById(req.params.id);
    res.json(updatedSport);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteSport = async (req, res) => {
  try {
    const success = await Sport.delete(req.params.id);
    if (!success) {
      return res.status(404).json({ message: 'Sport not found' });
    }
    res.json({ message: 'Sport deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};