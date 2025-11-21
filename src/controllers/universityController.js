import University from '../models/universityModel.js';

export const getAllUniversities = async (req, res) => {
  try {
    const universities = await University.findAll();
    res.json(universities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUniversityById = async (req, res) => {
  try {
    const university = await University.findById(req.params.id);
    if (!university) {
      return res.status(404).json({ message: 'University not found' });
    }
    res.json(university);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createUniversity = async (req, res) => {
  try {
    const university = await University.create(req.body);
    res.status(201).json(university);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateUniversity = async (req, res) => {
  try {
    const success = await University.update(req.params.id, req.body);
    if (!success) {
      return res.status(404).json({ message: 'University not found' });
    }
    const updatedUniversity = await University.findById(req.params.id);
    res.json(updatedUniversity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteUniversity = async (req, res) => {
  try {
    const success = await University.delete(req.params.id);
    if (!success) {
      return res.status(404).json({ message: 'University not found' });
    }
    res.json({ message: 'University deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};