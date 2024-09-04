import ClassroomRepository from "../repositories/ClassroomRepository";
import CustomerRepository from "../repositories/CustomerRepository";
import UserRepository from "../repositories/CustomerRepository";
import ClassroomMemberRepository from '../repositories/ClassroomMemberRepository';
import { myClassrooms } from "../types/myClassrooms";


class ClassService {
    async joinInClass(customerId: number, classId: number): Promise<number>{

        const existingClass = await ClassroomRepository.findClassroom(classId);
        if(!existingClass) {
            throw new Error('This class does not exist!')
        }

        return ClassroomMemberRepository.insertInClass({classId: classId, customerId: customerId});

    }

    async createClass(teacherId: number, classroomName: string): Promise<number>{ 
        const teacher = await CustomerRepository.findCustomerById(teacherId);
        if(!teacher) {
            throw new Error('This teacher does not exist!')
        }
        return ClassroomRepository.createClassroom({teacherId, classroomName});
    }

    async listClass(userId: number): Promise<myClassrooms[] | null> {
        const listClassIds = await ClassroomMemberRepository.listIdClassroomPerStudentOrProfessor(userId);
        if(listClassIds){
            for(const classId of listClassIds){
                const classInfo = await ClassroomRepository.findClassroom(classId);
            }
        } 
        return null
         
    }

}

export default new ClassService();