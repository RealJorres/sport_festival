import pool from '../config/db.js';

class Team {
  static async findAll() {
    try {
      const [rows] = await pool.query(`
        SELECT t.*, u.name as university_name, s.name as sport_name 
        FROM teams t
        JOIN universities u ON t.university_id = u.id
        JOIN sports s ON t.sport_id = s.id
      `);
      return rows;
    } catch (error) {
      throw new Error(`Error fetching teams: ${error.message}`);
    }
  }

  static async findById(id) {
    try {
      const [rows] = await pool.query(`
        SELECT t.*, u.name as university_name, s.name as sport_name 
        FROM teams t
        JOIN universities u ON t.university_id = u.id
        JOIN sports s ON t.sport_id = s.id
        WHERE t.id = ?
      `, [id]);
      return rows[0] || null;
    } catch (error) {
      throw new Error(`Error fetching team: ${error.message}`);
    }
  }

  static async findByUniversityId(universityId) {
    try {
      const [rows] = await pool.query(`
        SELECT t.*, u.name as university_name, s.name as sport_name 
        FROM teams t
        JOIN universities u ON t.university_id = u.id
        JOIN sports s ON t.sport_id = s.id
        WHERE t.university_id = ?
      `, [universityId]);
      return rows;
    } catch (error) {
      throw new Error(`Error fetching teams by university: ${error.message}`);
    }
  }

  static async findBySportId(sportId) {
    try {
      const [rows] = await pool.query(`
        SELECT t.*, u.name as university_name, s.name as sport_name 
        FROM teams t
        JOIN universities u ON t.university_id = u.id
        JOIN sports s ON t.sport_id = s.id
        WHERE t.sport_id = ?
      `, [sportId]);
      return rows;
    } catch (error) {
      throw new Error(`Error fetching teams by sport: ${error.message}`);
    }
  }

  static async create(teamData) {
    const { name, university_id, sport_id } = teamData;
    try {
      const [result] = await pool.query(
        'INSERT INTO teams (name, university_id, sport_id) VALUES (?, ?, ?)',
        [name, university_id, sport_id]
      );
      return this.findById(result.insertId);
    } catch (error) {
      throw new Error(`Error creating team: ${error.message}`);
    }
  }

  static async update(id, teamData) {
    const { name, university_id, sport_id } = teamData;
    const fields = [];
    const values = [];

    if (name !== undefined) {
      fields.push('name = ?');
      values.push(name);
    }
    if (university_id !== undefined) {
      fields.push('university_id = ?');
      values.push(university_id);
    }
    if (sport_id !== undefined) {
      fields.push('sport_id = ?');
      values.push(sport_id);
    }

    if (fields.length === 0) {
      throw new Error('No fields to update');
    }

    values.push(id);

    try {
      const [result] = await pool.query(
        `UPDATE teams SET ${fields.join(', ')} WHERE id = ?`,
        values
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`Error updating team: ${error.message}`);
    }
  }

  static async delete(id) {
    try {
      const [result] = await pool.query('DELETE FROM teams WHERE id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`Error deleting team: ${error.message}`);
    }
  }
}

export default Team;