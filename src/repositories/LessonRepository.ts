import { RowDataPacket } from 'mysql2';
import pool from '../config/database';
import { Lesson } from '../models/Lesson';

class LessonRepository {
    async getAllLessons(classroomId: number): Promise<Lesson[]> {
        const [rows] = await pool.query('SELECT * FROM lesson WHERE classroom_id = ?', [classroomId]);
        return rows as Lesson[];
    }

    async getLessonById(lessonId: number): Promise<Lesson | null> {
        const [rows] = await pool.query<RowDataPacket[]>('SELECT id, classroom_id as classroomId, title, content, created_at as createdAt FROM lesson WHERE id = ?', [lessonId]);
        if (rows.length) {
            return rows[0] as Lesson;
        }
        return null;
    }

    async createLesson(lesson: Lesson): Promise<number> {
        const [result] = await pool.query(
          'INSERT INTO lesson (classroom_id, title, content) VALUES (?, ?, ?)',
          [lesson.classroomId, lesson.title, lesson.content]
        );
        return (result as any).insertId;
      }
}

export default new LessonRepository();
