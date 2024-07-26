import pool from '../config/database';
import { Teacher } from '../models/Teacher';

class TeacherRepository {
  async createTeacher(Teacher: Teacher): Promise<number> {

    const [result] = await pool.query(
      'INSERT INTO teacher (email, password, name) VALUES (?, ?, ?)',
      [Teacher.email, Teacher.password, Teacher.name]
    );
    return (result as any).insertId;
  }

  async findTeacherByEmail(email: string): Promise<Teacher | null> {
    const [rows] = await pool.query('SELECT * FROM teacher WHERE email = ?', [email]);
    if ((rows as Teacher[]).length) {
      return (rows as Teacher[])[0];
    }
    return null;
  }

  async findTeacherById(teacherId : number): Promise<Teacher | null> {
    const [rows] = await pool.query('SELECT * FROM teacher WHERE id = ?', [teacherId]);
    if ((rows as Teacher[]).length) {
      return (rows as Teacher[])[0];
    }
    return null;
  }
}

export default new TeacherRepository();
