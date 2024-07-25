import pool from '../config/database';
import { ClassMembers } from '../models/ClassMembers';

class ClassMembersRepository {
    async insertInClass(classMembers : ClassMembers): Promise<number> {
        
        const [ result ] = await pool.query(
            'INSERT INTO class_members (class_id, user_id) VALUES (?, ?)',
        [classMembers.classId, classMembers.userId] 
        );

        return (result as any ).insertId;

    }
}

export default new ClassMembersRepository(); 