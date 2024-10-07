import pool from '../config/database';
import { Classroom } from '../models/Classroom';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

class ClassroomRepository {
    
    async findClassroom(classroomId: number): Promise<Classroom | null> {
        const [rows] = await pool.query<RowDataPacket[]>('SELECT id, teacher_id as teacherId, classroom_name as classroomName FROM classroom WHERE id = ?', [classroomId]);
        if (rows.length) {
            return rows[0] as Classroom;
        }
        return null;
    }

    async findClassroomPerClassroomCode(classroomCode: string): Promise<Classroom | null> {
        const [rows] = await pool.query<RowDataPacket[]>('SELECT id, teacher_id as teacherId, classroom_name as classroomName, classroom_code as classroomCode FROM classroom WHERE classroom_code = ?', [classroomCode]);
        if (rows.length) {
            return rows[0] as Classroom;
        }
        return null;
    }

    async createClassroom(classroom: Classroom): Promise<number> {
        const [result] = await pool.query<ResultSetHeader>(
            'INSERT INTO classroom (teacher_id, classroom_name, classroom_code) VALUES (?, ?, ?)',
            [classroom.teacherId, classroom.classroomName, classroom.classroomCode]
        );
        return result.insertId;
    }

    
    async getAllClassrooms(): Promise<Classroom[]> {
        const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM classroom');
        return rows as Classroom[];
    }
}

export default new ClassroomRepository();
