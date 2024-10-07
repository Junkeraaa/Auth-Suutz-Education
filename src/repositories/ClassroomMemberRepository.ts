import pool from '../config/database';
import { classroomId, countMembersClass, MemberInfo } from '../types/myClassrooms';
import type { ClassMember } from '../models/ClassMember';

class ClassroomMemberRepository {
    async insertInClass(ClassMember: ClassMember): Promise<number> {
        const [result] = await pool.query(
            'INSERT INTO classroom_member (classroom_id, customer_id, customer_name) VALUES (?, ?, ?)',
             [ClassMember.classId, ClassMember.customerId, ClassMember.customerName]);
        return (result as any).insertId;
    }

    async listIdClassroomPerStudent(userId: number): Promise<classroomId[]> {
        const [rows] = await pool.query('SELECT classroom_id as classroomId FROM classroom_member WHERE customer_id = ?', [userId]);
        return rows as classroomId[];
    }

    async listIdClassroomPerProfessor(userId: number): Promise<classroomId[]>{
        const [rows] = await pool.query('SELECT id as classroomId FROM classroom WHERE teacher_id = ?', [userId]);
        return rows as classroomId[]
    }

    async listMembersPerClassId(classroomId: number): Promise<number> {
        const [rows] = await pool.query('SELECT count(*) as numberOfMembers FROM classroom_member WHERE classroom_id = ?', [classroomId]);
        return (rows as countMembersClass[])[0].numberOfMembers;
    }

    async getStudentsInClass(classroomId: number): Promise<MemberInfo[]> {
        const [rows] = await pool.query('SELECT customer_id as memberId, customer_name as memberName FROM classroom_member WHERE classroom_id = ?', [classroomId]);
        return rows as MemberInfo[];
    }

    async getCustomerNamesInClass(classroomId: number): Promise<string[]> {
        const [rows] = await pool.query(
            'SELECT customer_name as customerName FROM classroom_member WHERE classroom_id = ?',
            [classroomId]
        );
    
        return (rows as { customerName: string }[]).map(row => row.customerName);
    }
    
}

export default new ClassroomMemberRepository();
