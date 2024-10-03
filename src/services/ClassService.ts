import ClassroomRepository from "../repositories/ClassroomRepository";
import ClassroomMemberRepository from "../repositories/ClassroomMemberRepository";
import TeacherRepository from "../repositories/TeacherRepository";
import LessonsRepository from "../repositories/LessonRepository";
import { myClassrooms, MemberInfo } from "../types/myClassrooms";
import { Lesson } from "../models/Lesson";
import { classroomContent } from "../types/classroomContent";

class ClassService {

    async joinInClass(customerId: number, classId: number, customerName: string): Promise<number> {
        const existingClass = await ClassroomRepository.findClassroom(classId);
        if (!existingClass) {
            throw new Error('This class does not exist!');
        }

        return ClassroomMemberRepository.insertInClass({ classId, customerId, customerName });
    }

    async createClass(teacherId: number, classroomName: string): Promise<number> {
        const teacher = await TeacherRepository.findTeacherById(teacherId);
        if (!teacher) {
            throw new Error('This teacher does not exist!');
        }

        return ClassroomRepository.createClassroom({ teacherId, classroomName });
    }

    async listClass(userId: number): Promise<myClassrooms[]> {
        const listClass: myClassrooms[] = [];
        const listClassIds = await ClassroomMemberRepository.listIdClassroomPerStudentOrProfessor(userId);

        for (const classId of listClassIds) {
            const classroom = await this.getClassroomInfo(classId.classroomId);
            if (classroom) listClass.push(classroom);
        }

        return listClass;
    }

    private async getClassroomInfo(classroomId: number): Promise<myClassrooms | null> {
        const classInfo = await ClassroomRepository.findClassroom(classroomId);
        if (!classInfo) return null;

        const numberOfMembers = await ClassroomMemberRepository.listMembersPerClassId(classroomId);
        const professorName = await TeacherRepository.findTeacherById(classInfo.teacherId);
        const lessons = await LessonsRepository.getAllLessons(classroomId);

        return {
            classroomId,
            nameClassroom: classInfo.classroomName,
            nameProfessor: professorName?.name || 'Unknown',
            membersClassroom: numberOfMembers,
            availableLessons: lessons.length,
        };
    }

    async getAllLessons(classroomId: number): Promise<Lesson[]> {
        return LessonsRepository.getAllLessons(classroomId);
    }

    async getAllStudents(classroomId: number): Promise<MemberInfo[]> {
        return ClassroomMemberRepository.getStudentsInClass(classroomId);
    }

    async getClassInfosToFront(classroomId: number): Promise<classroomContent>{
        const lessons = await LessonsRepository.getAllLessons(classroomId);
        if(!lessons){
            throw new Error('No lesson found!');
        }
        const classroom = await ClassroomRepository.findClassroom(classroomId);
        if(!classroom){
            throw new Error('Error when searching for class');
        }
        
        const classroomMembers = await ClassroomMemberRepository.getCustomerNamesInClass(classroomId);
        if(!classroomMembers){
            throw new Error('Failed to fetch room members');
        }
        return {
            classroomName: classroom.classroomName,
            lessons: lessons,
            membersName: classroomMembers,
        }
    }
}

export default new ClassService();
