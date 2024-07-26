import pool from '../config/database';
import { Classroom } from '../models/Classroom';

class ClassroomRepository {
    async findClassroom (classroomId: number): Promise<Classroom | null> {

       const [ rows ] = await pool.query('SELECT * FROM classroom WHERE id = ?', [classroomId]);
       if((rows as Classroom[]).length) {
        return (rows as Classroom[])[0];
            }
            return null;
        
    }

    async createClassroom (Classroom: Classroom): Promise<number> { 

        const [ result ] = await pool.query(
            'INSERT INTO classroom (teacher_id, classroom_name) VALUES (?, ?)',
            [Classroom.teacherId, Classroom.classroomName]
        );

        return (result as any ).insertId;

    }
}

export default new ClassroomRepository(); 