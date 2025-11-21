import pool from '../config/db.js';

class MedalRef {
  static async findAll() {
    try {
      const [rows] = await pool.query('SELECT * FROM medal_ref ORDER BY points DESC');
      return rows;
    } catch (error) {
      throw new Error(`Error fetching medal references: ${error.message}`);
    }
  }

  static async findById(id) {
    try {
      const [rows] = await pool.query('SELECT * FROM medal_ref WHERE id = ?', [id]);
      return rows[0] || null;
    } catch (error) {
      throw new Error(`Error fetching medal reference: ${error.message}`);
    }
  }

  static async findByName(name) {
    try {
      const [rows] = await pool.query('SELECT * FROM medal_ref WHERE name = ?', [name]);
      return rows[0] || null;
    } catch (error) {
      throw new Error(`Error fetching medal reference by name: ${error.message}`);
    }
  }

  static async create(medalRefData) {
    const { name, points, description } = medalRefData;
    try {
      const [result] = await pool.query(
        'INSERT INTO medal_ref (name, points, description) VALUES (?, ?, ?)',
        [name, points, description]
      );
      return this.findById(result.insertId);
    } catch (error) {
      throw new Error(`Error creating medal reference: ${error.message}`);
    }
  }

  static async update(id, medalRefData) {
    const { name, points, description } = medalRefData;
    try {
      const [result] = await pool.query(
        'UPDATE medal_ref SET name = ?, points = ?, description = ? WHERE id = ?',
        [name, points, description, id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`Error updating medal reference: ${error.message}`);
    }
  }

  static async delete(id) {
    try {
      const [result] = await pool.query('DELETE FROM medal_ref WHERE id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`Error deleting medal reference: ${error.message}`);
    }
  }
}

export default MedalRef;