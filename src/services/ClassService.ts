import ClassroomRepository from "../repositories/ClassroomRepository";
import CustomerRepository from "../repositories/CustomerRepository";
import UserRepository from "../repositories/CustomerRepository";
import ClassroomMemberRepository from '../repositories/ClassroomMemberRepository';

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

}

export default new ClassService();