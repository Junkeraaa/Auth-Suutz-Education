import pool from '../config/database';
import { ClassMember } from '../models/ClassMember';
import { classroomId, countMembersClass } from '../types/myClassrooms';

class ClassroomMemberRepository {
    async insertInClass(ClassMember : ClassMember): Promise<number> {
        
        const [ result ] = await pool.query(
            'INSERT INTO classroom_member (classroom_id, customer_id) VALUES (?, ?)',
        [ClassMember.classId, ClassMember.customerId] 
        );

        return (result as any ).insertId;

    }

    async listIdClassroomPerStudentOrProfessor (userId: number): Promise<classroomId[] | null> {

        const [ rows ] = await pool.query('SELECT classroom_id FROM  classroom_member WHERE customer_id = ?', [userId]);
        if((rows as classroomId[]).length) {
         return rows as classroomId[];      
     }
     return null

    }

    async listMembersPerClasId (classroomId: number): Promise<number> {

        const [ rows ] = await pool.query('SELECT count(*) WHERE classroom_id = ?', [classroomId]);
        if((rows as countMembersClass[]).length >= 1) {
             return ( rows as countMembersClass[])[0].numberOfMembers;      
        }

        return 0
    }
}

export default new ClassroomMemberRepository(); 