import pool from '../config/db.js';

class Medal {

  // ================================
  // FETCH ALL MEDALS
  // ================================
  static async findAll() {
    try {
      const [rows] = await pool.query(`
        SELECT m.id, m.medal_type, m.medal_count,
               p.id AS participant_id,
               t.id AS team_id, t.name AS team_name,
               u.id AS university_id, u.name AS university_name,
               s.id AS schedule_id, s.event_name
        FROM medals m
        JOIN participants p ON m.participant_id = p.id
        JOIN teams t ON p.team_id = t.id
        JOIN universities u ON t.university_id = u.id
        JOIN schedules s ON m.schedule_id = s.id
      `);
      return rows;
    } catch (error) {
      throw new Error(`Error fetching medals: ${error.message}`);
    }
  }

  // ================================
  // FIND BY ID
  // ================================
  static async findById(id) {
    try {
      const [rows] = await pool.query(`
        SELECT m.id, m.medal_type, m.medal_count,
               p.id AS participant_id,
               t.id AS team_id, t.name AS team_name,
               u.id AS university_id, u.name AS university_name,
               s.id AS schedule_id, s.event_name
        FROM medals m
        JOIN participants p ON m.participant_id = p.id
        JOIN teams t ON p.team_id = t.id
        JOIN universities u ON t.university_id = u.id
        JOIN schedules s ON m.schedule_id = s.id
        WHERE m.id = ?
      `, [id]);

      return rows[0] || null;
    } catch (error) {
      throw new Error(`Error fetching medal: ${error.message}`);
    }
  }

  // ================================
  // FIND BY SCHEDULE
  // ================================
  static async findByScheduleId(scheduleId) {
    try {
      const [rows] = await pool.query(`
        SELECT m.id, m.medal_type, m.medal_count,
               p.id AS participant_id,
               t.id AS team_id, t.name AS team_name,
               u.id AS university_id, u.name AS university_name,
               s.id AS schedule_id, s.event_name
        FROM medals m
        JOIN participants p ON m.participant_id = p.id
        JOIN teams t ON p.team_id = t.id
        JOIN universities u ON t.university_id = u.id
        JOIN schedules s ON m.schedule_id = s.id
        WHERE m.schedule_id = ?
      `, [scheduleId]);

      return rows;
    } catch (error) {
      throw new Error(`Error fetching medals by schedule: ${error.message}`);
    }
  }

  // ================================
  // FIND BY UNIVERSITY
  // ================================
  static async findByUniversityId(universityId) {
    try {
      const [rows] = await pool.query(`
        SELECT m.id, m.medal_type, m.medal_count,
               p.id AS participant_id,
               t.id AS team_id, t.name AS team_name,
               u.id AS university_id, u.name AS university_name,
               s.id AS schedule_id, s.event_name
        FROM medals m
        JOIN participants p ON m.participant_id = p.id
        JOIN teams t ON p.team_id = t.id
        JOIN universities u ON t.university_id = u.id
        JOIN schedules s ON m.schedule_id = s.id
        WHERE u.id = ?
      `, [universityId]);

      return rows;
    } catch (error) {
      throw new Error(`Error fetching medals by university: ${error.message}`);
    }
  }

  // ================================
  // CREATE MEDAL
  // ================================
  static async create({ participant_id, schedule_id, medal_type, medal_count }) {
    try {
      const [result] = await pool.query(
        `INSERT INTO medals (participant_id, schedule_id, medal_type, medal_count)
         VALUES (?, ?, ?, ?)`,
        [participant_id, schedule_id, medal_type, medal_count]
      );

      return this.findById(result.insertId);
    } catch (error) {
      throw new Error(`Error creating medal: ${error.message}`);
    }
  }

  // ================================
  // UPDATE MEDAL
  // ================================
  static async update(id, { medal_type, medal_count }) {
    try {
      const [result] = await pool.query(
        `UPDATE medals 
         SET medal_type = ?, medal_count = ?
         WHERE id = ?`,
        [medal_type, medal_count, id]
      );

      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`Error updating medal: ${error.message}`);
    }
  }

  // ================================
  // DELETE MEDAL
  // ================================
  static async delete(id) {
    try {
      const [result] = await pool.query(
        `DELETE FROM medals WHERE id = ?`,
        [id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`Error deleting medal: ${error.message}`);
    }
  }

  // ================================
  // MEDAL TALLY (SUM OF medal_count)
  // ================================
  static async getMedalTally() {
    try {
      const [rows] = await pool.query(`
        SELECT 
          u.id AS university_id,
          u.name AS university_name,
          u.abbreviation AS university_acronym,

          SUM(CASE WHEN m.medal_type = 'gold' THEN m.medal_count ELSE 0 END) AS gold,
          SUM(CASE WHEN m.medal_type = 'silver' THEN m.medal_count ELSE 0 END) AS silver,
          SUM(CASE WHEN m.medal_type = 'bronze' THEN m.medal_count ELSE 0 END) AS bronze,

          (SUM(m.medal_count)) AS total

        FROM medals m
        JOIN participants p ON m.participant_id = p.id
        JOIN teams t ON p.team_id = t.id
        JOIN universities u ON t.university_id = u.id
        
        GROUP BY u.id
        ORDER BY gold DESC, silver DESC, bronze DESC;
      `);

      return rows;
    } catch (error) {
      throw new Error(`Error fetching medal tally: ${error.message}`);
    }
  }
}

export default Medal;
