import Schedule from '../models/scheduleModel.js';

export const getAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.findAll();
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getScheduleById = async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id);
    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }
    res.json(schedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSchedulesBySport = async (req, res) => {
  try {
    const schedules = await Schedule.findBySportId(req.params.sportId);
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSchedulesByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const validStatuses = ['scheduled', 'ongoing', 'cancelled', 'ended'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    
    const schedules = await Schedule.findByStatus(status);
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.create(req.body);
    res.status(201).json(schedule);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateSchedule = async (req, res) => {
  try {
    const success = await Schedule.update(req.params.id, req.body);
    if (!success) {
      return res.status(404).json({ message: 'Schedule not found' });
    }
    const updatedSchedule = await Schedule.findById(req.params.id);
    res.json(updatedSchedule);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateScheduleStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['scheduled', 'ongoing', 'cancelled', 'ended'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    
    const success = await Schedule.updateStatus(req.params.id, status);
    if (!success) {
      return res.status(404).json({ message: 'Schedule not found' });
    }
    const updatedSchedule = await Schedule.findById(req.params.id);
    res.json(updatedSchedule);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteSchedule = async (req, res) => {
  try {
    const success = await Schedule.delete(req.params.id);
    if (!success) {
      return res.status(404).json({ message: 'Schedule not found' });
    }
    res.json({ message: 'Schedule deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};