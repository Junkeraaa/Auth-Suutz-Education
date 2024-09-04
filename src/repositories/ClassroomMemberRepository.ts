import pool from '../config/database';
import { ClassMember } from '../models/ClassMember';

class ClassroomMemberRepository {
    async insertInClass(ClassMember : ClassMember): Promise<number> {
        
        const [ result ] = await pool.query(
            'INSERT INTO classroom_member (classroom_id, customer_id) VALUES (?, ?)',
        [ClassMember.classId, ClassMember.customerId] 
        );

        return (result as any ).insertId;

    }

    async listIdClassroomPerStudentOrProfessor (userId: number): Promise<unknown[] | null> {

        const [ rows ] = await pool.query('SELECT classroom_id FROM  classroom_member WHERE customer_id = ?', [userId]);
        if((rows as unknown[]).length) {
         return rows as unknown[];
             }
         return null;
     }
}

export default new ClassroomMemberRepository(); 