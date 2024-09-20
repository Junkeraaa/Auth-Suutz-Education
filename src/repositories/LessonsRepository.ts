import { RowDataPacket } from 'mysql2';
import pool from '../config/database';
import { lessons } from '../models/lessons';

class LessonsRepository {
    async getAllLessons(classroomId: number): Promise<lessons[]> {
        const [rows] = await pool.query('SELECT * FROM lesson WHERE classroom_id = ?', [classroomId]);
        return rows as lessons[];
    }

    async getLessonById(lessonId: number): Promise<lessons | null> {
        const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM lesson WHERE id = ?', [lessonId]);
        if (rows.length) {
            return (rows as lessons[])[0];
        }
        return null;
    }
}

export default new LessonsRepository();
