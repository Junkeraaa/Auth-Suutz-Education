import pool from '../config/database';
import { ClassMember } from '../models/ClassMember';

class ClassroomMemberRepository {
    async insertInClass(ClassMember : ClassMember): Promise<number> {
        
        const [ result ] = await pool.query(
            'INSERT INTO class_member (class_id, user_id) VALUES (?, ?)',
        [ClassMember.classId, ClassMember.customerId] 
        );

        return (result as any ).insertId;

    }
}

export default new ClassroomMemberRepository(); 