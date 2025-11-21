import pool from '../config/db.js';

class Score {
  static async findAll() {
    try {
      const [rows] = await pool.query(`
        SELECT sc.*, p.id as participant_id, t.name as team_name, 
               u.name as university_name, s.event_name
        FROM scores sc
        JOIN participants p ON sc.participant_id = p.id
        JOIN teams t ON p.team_id = t.id
        JOIN universities u ON t.university_id = u.id
        JOIN schedules s ON sc.schedule_id = s.id
      `);
      return rows;
    } catch (error) {
      throw new Error(`Error fetching scores: ${error.message}`);
    }
  }

  static async findById(id) {
    try {
      const [rows] = await pool.query(`
        SELECT sc.*, p.id as participant_id, t.name as team_name, 
               u.name as university_name, s.event_name
        FROM scores sc
        JOIN participants p ON sc.participant_id = p.id
        JOIN teams t ON p.team_id = t.id
        JOIN universities u ON t.university_id = u.id
        JOIN schedules s ON sc.schedule_id = s.id
        WHERE sc.id = ?
      `, [id]);
      return rows[0] || null;
    } catch (error) {
      throw new Error(`Error fetching score: ${error.message}`);
    }
  }

  static async findByScheduleId(scheduleId) {
    try {
      const [rows] = await pool.query(`
        SELECT sc.*, p.id as participant_id, t.name as team_name, 
               u.name as university_name, s.event_name
        FROM scores sc
        JOIN participants p ON sc.participant_id = p.id
        JOIN teams t ON p.team_id = t.id
        JOIN universities u ON t.university_id = u.id
        JOIN schedules s ON sc.schedule_id = s.id
        WHERE sc.schedule_id = ?
        ORDER BY sc.score DESC
      `, [scheduleId]);
      return rows;
    } catch (error) {
      throw new Error(`Error fetching scores by schedule: ${error.message}`);
    }
  }

  static async findByParticipantId(participantId) {
    try {
      const [rows] = await pool.query(`
        SELECT sc.*, p.id as participant_id, t.name as team_name, 
               u.name as university_name, s.event_name
        FROM scores sc
        JOIN participants p ON sc.participant_id = p.id
        JOIN teams t ON p.team_id = t.id
        JOIN universities u ON t.university_id = u.id
        JOIN schedules s ON sc.schedule_id = s.id
        WHERE sc.participant_id = ?
      `, [participantId]);
      return rows;
    } catch (error) {
      throw new Error(`Error fetching scores by participant: ${error.message}`);
    }
  }

  static async create(scoreData) {
    const { participant_id, schedule_id, score } = scoreData;
    try {
      const [result] = await pool.query(
        'INSERT INTO scores (participant_id, schedule_id, score) VALUES (?, ?, ?)',
        [participant_id, schedule_id, score]
      );
      return this.findById(result.insertId);
    } catch (error) {
      throw new Error(`Error creating score: ${error.message}`);
    }
  }

  static async update(id, scoreData) {
    const { score } = scoreData;
    const fields = [];
    const values = [];

    if (score !== undefined) {
      fields.push('score = ?');
      values.push(score);
    }

    if (fields.length === 0) {
      throw new Error('No fields to update');
    }

    values.push(id);

    try {
      const [result] = await pool.query(
        `UPDATE scores SET ${fields.join(', ')} WHERE id = ?`,
        values
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`Error updating score: ${error.message}`);
    }
  }

  static async delete(id) {
    try {
      const [result] = await pool.query('DELETE FROM scores WHERE id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`Error deleting score: ${error.message}`);
    }
  }
}

export default Score;