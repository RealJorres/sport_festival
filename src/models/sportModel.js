import pool from '../config/db.js';

class Sport {
  static async findAll() {
    try {
      const [rows] = await pool.query('SELECT * FROM sports');
      return rows;
    } catch (error) {
      throw new Error(`Error fetching sports: ${error.message}`);
    }
  }

  static async findById(id) {
    try {
      const [rows] = await pool.query('SELECT * FROM sports WHERE id = ?', [id]);
      return rows[0] || null;
    } catch (error) {
      throw new Error(`Error fetching sport: ${error.message}`);
    }
  }

  static async create(sportData) {
    const { name, category } = sportData;
    try {
      const [result] = await pool.query(
        'INSERT INTO sports (name, category) VALUES (?, ?)',
        [name, category]
      );
      return this.findById(result.insertId);
    } catch (error) {
      throw new Error(`Error creating sport: ${error.message}`);
    }
  }

  static async update(id, sportData) {
    const { name, category } = sportData;
    const fields = [];
    const values = [];

    if (name !== undefined) {
      fields.push('name = ?');
      values.push(name);
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
        `UPDATE sports SET ${fields.join(', ')} WHERE id = ?`,
        values
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`Error updating sport: ${error.message}`);
    }
  }

  static async delete(id) {
    try {
      const [result] = await pool.query('DELETE FROM sports WHERE id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`Error deleting sport: ${error.message}`);
    }
  }
}

export default Sport;