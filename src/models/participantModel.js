import pool from '../config/db.js';

class Participant {
  static async findAll() {
    try {
      const [rows] = await pool.query(`
        SELECT p.*, t.name as team_name, u.name as university_name, s.event_name
        FROM participants p
        JOIN teams t ON p.team_id = t.id
        JOIN universities u ON t.university_id = u.id
        JOIN schedules s ON p.schedule_id = s.id
      `);
      return rows;
    } catch (error) {
      throw new Error(`Error fetching participants: ${error.message}`);
    }
  }

  static async findById(id) {
    try {
      const [rows] = await pool.query(`
        SELECT p.*, t.name as team_name, u.name as university_name, s.event_name
        FROM participants p
        JOIN teams t ON p.team_id = t.id
        JOIN universities u ON t.university_id = u.id
        JOIN schedules s ON p.schedule_id = s.id
        WHERE p.id = ?
      `, [id]);
      return rows[0] || null;
    } catch (error) {
      throw new Error(`Error fetching participant: ${error.message}`);
    }
  }

  static async findByScheduleId(scheduleId) {
    try {
      const [rows] = await pool.query(`
        SELECT p.*, t.name as team_name, u.name as university_name, s.event_name
        FROM participants p
        JOIN teams t ON p.team_id = t.id
        JOIN universities u ON t.university_id = u.id
        JOIN schedules s ON p.schedule_id = s.id
        WHERE p.schedule_id = ?
      `, [scheduleId]);
      return rows;
    } catch (error) {
      throw new Error(`Error fetching participants by schedule: ${error.message}`);
    }
  }

  static async findByTeamId(teamId) {
    try {
      const [rows] = await pool.query(`
        SELECT p.*, t.name as team_name, u.name as university_name, s.event_name
        FROM participants p
        JOIN teams t ON p.team_id = t.id
        JOIN universities u ON t.university_id = u.id
        JOIN schedules s ON p.schedule_id = s.id
        WHERE p.team_id = ?
      `, [teamId]);
      return rows;
    } catch (error) {
      throw new Error(`Error fetching participants by team: ${error.message}`);
    }
  }

  static async create(participantData) {
    const { schedule_id, team_id } = participantData;
    try {
      const [result] = await pool.query(
        'INSERT INTO participants (schedule_id, team_id) VALUES (?, ?)',
        [schedule_id, team_id]
      );
      return this.findById(result.insertId);
    } catch (error) {
      throw new Error(`Error creating participant: ${error.message}`);
    }
  }

  static async delete(id) {
    try {
      const [result] = await pool.query('DELETE FROM participants WHERE id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`Error deleting participant: ${error.message}`);
    }
  }
}

export default Participant;