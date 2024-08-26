import { BaseEntity } from "typeorm";
import { ApplicationRequest } from "../../common/interfaces";
import dataSource from "../../config/datasource";
import Classroom from "../../entity/classroom/classroom.entity";
import { Student } from "../../entity/student/student.entity";
import { Response } from "express";





interface IExitClassroom {
    studentId: string;
    classroomId: string;
}

interface IEnterClassroom {
    studentId: string;
    classroomId: string;
}

export default class StudentController extends BaseEntity {
    async enterClassroom({ studentId, classroomId }: IEnterClassroom, req: ApplicationRequest, res: Response ): Promise<Classroom> {
        const classroomRepository = dataSource.getRepository(Classroom);
        const studentRepository = dataSource.getRepository(Student);

        const student = await studentRepository.findOneOrFail({ 
            where: { 
                id: studentId 
            }, 
            select: { 
                name: true, 
                email: true, 
                id: true 
        }});
        
        const classroom = await classroomRepository.findOneOrFail({ 
            select: {
                students: { 
                    id: true, 
                    name: true, 
                    email: true,
                    password: false
                } 
            }, 
            where: { 
                id: classroomId 
            }, 
            relations: { 
                students: true 
        }});
        
        classroom.students.push(student);

        await classroom.save();
        
        return classroom;

    }
    
    async exitClassroom({ classroomId, studentId }: IExitClassroom, req: ApplicationRequest, res: Response): Promise<void> {
        const studentRepository = dataSource.getRepository(Student);
        let student = await studentRepository.findOneOrFail({ select: { classrooms: { id: true } }, where: { id: studentId }, relations: { classrooms: true } });
        if (student.classrooms) {
            student.classrooms = student.classrooms.filter(classroom => classroom.id !== classroomId);
        }
        await student.save();
    }

}