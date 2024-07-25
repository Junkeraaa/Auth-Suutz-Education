import ClassManagerRepository from "../repositories/ClassManagerRepository";
import UserRepository from "../repositories/UserRepository";

class ClassService {

    async createClass(teacherId: number, className: string): Promise<number>{ 
        const teacher = await UserRepository.findUserById(teacherId);
        if (teacher?.role === 'aluno'){
            throw new Error('Only teachers can create classrooms')
        }

        const classId =  ClassManagerRepository.createClass({teacherId, className});

        return classId;
    }

}

export default new ClassService();