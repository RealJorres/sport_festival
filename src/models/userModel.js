import pool from '../config/db.js';

class User {
  static async findAll() {
    try {
      const [rows] = await pool.query('SELECT id, username, role FROM users');
      return rows;
    } catch (error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
  }

  static async findById(id) {
    try {
      const [rows] = await pool.query('SELECT id, username, role FROM users WHERE id = ?', [id]);
      return rows[0] || null;
    } catch (error) {
      throw new Error(`Error fetching user: ${error.message}`);
    }
  }

  static async findByUsername(username) {
    try {
      const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
      return rows[0] || null;
    } catch (error) {
      throw new Error(`Error fetching user by username: ${error.message}`);
    }
  }

  static async create(userData) {
    const { username, password, role = 'viewer', sports_id } = userData;
    try {
      const [result] = await pool.query(
        'INSERT INTO users (username, password, role, sports_id) VALUES (?, ?, ?, ?)',
        [username, password, role, sports_id]
      );
      return this.findById(result.insertId);
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  static async update(id, userData) {
    const { username, password, role } = userData;
    const fields = [];
    const values = [];

    if (username !== undefined) {
      fields.push('username = ?');
      values.push(username);
    }
    if (password !== undefined) {
      fields.push('password = ?');
      values.push(password);
    }
    if (role !== undefined) {
      fields.push('role = ?');
      values.push(role);
    }

    if (sports_id !== undefined) {
      fields.push('sports_id = ?');
      values.push(sports_id);
    }

    if (fields.length === 0) {
      throw new Error('No fields to update');
    }

    values.push(id);

    try {
      const [result] = await pool.query(
        `UPDATE users SET ${fields.join(', ')} WHERE id = ?`,
        values
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`Error updating user: ${error.message}`);
    }
  }

  static async delete(id) {
    try {
      const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
  }
}

export default User;
