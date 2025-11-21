import Medal from '../models/medalModel.js';

export const getAllMedals = async (req, res) => {
  try {
    const medals = await Medal.findAll();
    res.json(medals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMedalTally = async (req, res) => {
  try {
    const tally = await Medal.getMedalTally();
    res.json(tally);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMedalById = async (req, res) => {
  try {
    const medal = await Medal.findById(req.params.id);
    if (!medal) return res.status(404).json({ message: 'Medal not found' });
    res.json(medal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMedalsBySchedule = async (req, res) => {
  try {
    const medals = await Medal.findByScheduleId(req.params.scheduleId);
    res.json(medals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMedalsByUniversity = async (req, res) => {
  try {
    const medals = await Medal.findByUniversityId(req.params.universityId);
    res.json(medals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createMedal = async (req, res) => {
  try {
    const { participant_id, schedule_id, medal_type, medal_count } = req.body;

    // Validate medal_type
    const allowed = ['gold', 'silver', 'bronze'];
    if (!allowed.includes(medal_type)) {
      return res.status(400).json({ message: 'Invalid medal type' });
    }

    // Validate medal_count
    const count = Number(medal_count);
    if (!Number.isInteger(count) || count < 1) {
      return res.status(400).json({ message: 'medal_count must be a positive integer' });
    }

    const medal = await Medal.create({
      participant_id,
      schedule_id,
      medal_type,
      medal_count: count
    });

    res.status(201).json(medal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateMedal = async (req, res) => {
  try {
    const { medal_type, medal_count } = req.body;
    const updates = {};

    // Optional medal_type update
    if (medal_type) {
      const allowed = ['gold', 'silver', 'bronze'];
      if (!allowed.includes(medal_type)) {
        return res.status(400).json({ message: 'Invalid medal type' });
      }
      updates.medal_type = medal_type;
    }

    // Optional medal_count update
    if (medal_count !== undefined) {
      const count = Number(medal_count);
      if (!Number.isInteger(count) || count < 1) {
        return res.status(400).json({ message: 'medal_count must be a positive integer' });
      }
      updates.medal_count = count;
    }

    const success = await Medal.update(req.params.id, updates);
    if (!success) return res.status(404).json({ message: 'Medal not found' });

    const updatedMedal = await Medal.findById(req.params.id);
    res.json(updatedMedal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteMedal = async (req, res) => {
  try {
    const success = await Medal.delete(req.params.id);
    if (!success) return res.status(404).json({ message: 'Medal not found' });
    res.json({ message: 'Medal deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
