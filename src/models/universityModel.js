import pool from '../config/db.js';

class University {
  static async findAll() {
    try {
      const [rows] = await pool.query('SELECT * FROM universities');
      return rows;
    } catch (error) {
      throw new Error(`Error fetching universities: ${error.message}`);
    }
  }

  static async findById(id) {
    try {
      const [rows] = await pool.query('SELECT * FROM universities WHERE id = ?', [id]);
      return rows[0] || null;
    } catch (error) {
      throw new Error(`Error fetching university: ${error.message}`);
    }
  }

  static async create(universityData) {
    const { name, abbreviation } = universityData;
    try {
      const [result] = await pool.query(
        'INSERT INTO universities (name, abbreviation) VALUES (?, ?)',
        [name, abbreviation]
      );
      return this.findById(result.insertId);
    } catch (error) {
      throw new Error(`Error creating university: ${error.message}`);
    }
  }

  static async update(id, universityData) {
    const { name, abbreviation } = universityData;
    const fields = [];
    const values = [];

    if (name !== undefined) {
      fields.push('name = ?');
      values.push(name);
    }
    if (abbreviation !== undefined) {
      fields.push('abbreviation = ?');
      values.push(abbreviation);
    }

    if (fields.length === 0) {
      throw new Error('No fields to update');
    }

    values.push(id);

    try {
      const [result] = await pool.query(
        `UPDATE universities SET ${fields.join(', ')} WHERE id = ?`,
        values
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`Error updating university: ${error.message}`);
    }
  }

  static async delete(id) {
    try {
      const [result] = await pool.query('DELETE FROM universities WHERE id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`Error deleting university: ${error.message}`);
    }
  }
}

export default University;