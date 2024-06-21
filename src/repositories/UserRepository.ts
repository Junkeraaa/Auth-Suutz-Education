import pool from '../config/database';
import { User } from '../models/User';

class UserRepository {
  async createUser(user: User): Promise<number> {
    const [result] = await pool.query(
      'INSERT INTO users (email, password, role) VALUES (?, ?, ?)',
      [user.email, user.password, user.role]
    );
    return (result as any).insertId;
  }

  async findByEmail(email: string): Promise<User | null> {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if ((rows as User[]).length) {
      return (rows as User[])[0];
    }
    return null;
  }
}

export default new UserRepository();
