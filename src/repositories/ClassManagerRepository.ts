import pool from '../config/database';
import { ClassManager } from '../models/ClassManager';

class ClassManagerRepository {
    async findClass (classId: number | null | undefined): Promise<ClassManager | null> {

        if(classId){
       const [ rows ] = await pool.query('SELECT * FROM class_manager WHERE id = ?', [classId]);
       if((rows as ClassManager[]).length) {
        return (rows as ClassManager[])[0];
            }
            return null;
        }
        return { id: 1, teacherId: 1, className: "Classe Suutz Education"}
    }

    async createClass (classManager: ClassManager): Promise<number> { 

        const [ result ] = await pool.query(
            'INSERT INTO class_manager (teacher_id, class_name) VALUES (?, ?)',
            [classManager.teacherId, classManager.className]
        );

        return (result as any ).insertId;

    }
}

export default new ClassManagerRepository(); 