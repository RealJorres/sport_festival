import pool from '../config/db.js';

class Schedule {
  static async findAll() {
    try {
      const [rows] = await pool.query(`
        SELECT s.*, sp.name as sport_name 
        FROM schedules s
        JOIN sports sp ON s.sport_id = sp.id
        ORDER BY s.date, s.status
      `);
      return rows;
    } catch (error) {
      throw new Error(`Error fetching schedules: ${error.message}`);
    }
  }

  static async findById(id) {
    try {
      const [rows] = await pool.query(`
        SELECT s.*, sp.name as sport_name 
        FROM schedules s
        JOIN sports sp ON s.sport_id = sp.id
        WHERE s.id = ?
      `, [id]);
      return rows[0] || null;
    } catch (error) {
      throw new Error(`Error fetching schedule: ${error.message}`);
    }
  }

  static async findBySportId(sportId) {
    try {
      const [rows] = await pool.query(`
        SELECT s.*, sp.name as sport_name 
        FROM schedules s
        JOIN sports sp ON s.sport_id = sp.id
        WHERE s.sport_id = ?
        ORDER BY s.date, s.status
      `, [sportId]);
      return rows;
    } catch (error) {
      throw new Error(`Error fetching schedules by sport: ${error.message}`);
    }
  }

  static async findByStatus(status) {
    try {
      const [rows] = await pool.query(`
        SELECT s.*, sp.name as sport_name 
        FROM schedules s
        JOIN sports sp ON s.sport_id = sp.id
        WHERE s.status = ?
        ORDER BY s.date
      `, [status]);
      return rows;
    } catch (error) {
      throw new Error(`Error fetching schedules by status: ${error.message}`);
    }
  }

  static async create(scheduleData) {
    const { sport_id, event_name, date, venue, status = 'scheduled', round, category } = scheduleData;
    try {
      const [result] = await pool.query(
        'INSERT INTO schedules (sport_id, event_name, date, venue, status, round, category) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [sport_id, event_name, date, venue, status, round, category]
      );
      return this.findById(result.insertId);
    } catch (error) {
      throw new Error(`Error creating schedule: ${error.message}`);
    }
  }

  static async update(id, scheduleData) {
    const { sport_id, event_name, date, venue, status, round, category } = scheduleData;
    const fields = [];
    const values = [];

    if (sport_id !== undefined) {
      fields.push('sport_id = ?');
      values.push(sport_id);
    }
    if (event_name !== undefined) {
      fields.push('event_name = ?');
      values.push(event_name);
    }
    if (date !== undefined) {
      fields.push('date = ?');
      values.push(date);
    }
    if (venue !== undefined) {
      fields.push('venue = ?');
      values.push(venue);
    }
    if (status !== undefined) {
      fields.push('status = ?');
      values.push(status);
    }

    if (round !== undefined) {
      fields.push('round = ?');
      values.push(round);
    }

    if (category !== undefined) {
      fields.push('category = ?');
      values.push(category);
    }

    if (fields.length === 0) {
      throw new Error('No fields to update');
    }

    values.push(id);

    try {
      const [result] = await pool.query(
        `UPDATE schedules SET ${fields.join(', ')} WHERE id = ?`,
        values
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`Error updating schedule: ${error.message}`);
    }
  }

  static async updateStatus(id, status) {
    try {
      const [result] = await pool.query(
        'UPDATE schedules SET status = ? WHERE id = ?',
        [status, id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`Error updating schedule status: ${error.message}`);
    }
  }

  static async delete(id) {
    try {
      const [result] = await pool.query('DELETE FROM schedules WHERE id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`Error deleting schedule: ${error.message}`);
    }
  }
}

export default Schedule;