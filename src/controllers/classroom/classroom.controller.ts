import dataSource from "../../config/datasource";

import { response, Response } from "express";

import Classroom from "../../entity/classroom/classroom.entity";
import { Teacher } from "../../entity/teacher/teacher.entity";
import { error } from "console";
import { ApplicationRequest, IRole, Roles, UserContext } from "../../common/interfaces";
import canPerformAction from "../common/canPerformAction";
import { FindOptionsRelations, FindOptionsSelect, FindOptionsSelectByString } from "typeorm";

interface CreateClassroomInput {
    name: string;
    teacherId: string;
}
interface UpdateClassroomInput {
    id: string;
    name: string;
}


class ClassroomController { 
    async listClassroom(id: string | undefined, req: ApplicationRequest, res: Response): Promise<Classroom[]> {
        const select: FindOptionsSelect<Classroom> = {
            teacher: {
                email: true,
                name: true,
                id: true,
                role: true
            },
            students: {
                email: true,
                name: true,
                id: true,
                role: true
            },
        }

        const relations: FindOptionsRelations<Classroom> = { 
            lesson: { 
                content: true 
            }, 
            teacher: { 

            }, 
            students: true 
        }

        const classroom = dataSource.getRepository(Classroom);
        if(id) {
            return classroom.find({
                select,
                relations,
                where: { 
                    id 
                }, 
                });
        }
        
        return classroom.find({
            select, 
            relations
        });
    }

    async createClassroom (classroomInput: CreateClassroomInput, req: ApplicationRequest, res: Response): Promise<string> {
        canPerformAction(req, Roles.TEACHER);
        const { name, teacherId } = classroomInput;
        const teacherRepo = dataSource.getRepository(Teacher);
        const classroomRepo = dataSource.getRepository(Classroom);
        const teacher = await teacherRepo.findOneOrFail({ where: { id: teacherId } });
        const classroom = classroomRepo.create({ name, teacher });
        
        const { id } = await classroom.save();

        return id;
    
    }
    
    async updateClassroom({ id, name }: UpdateClassroomInput, req: ApplicationRequest, res: Response): Promise<number | undefined> {
        const classroomRepo = dataSource.getRepository(Classroom);
        const { affected } = await classroomRepo.update({ id }, { name });
        return affected;
    };
    
    async deleteClassroom(classroomId: string, req: ApplicationRequest, res: Response) {
        const classroomRepo = dataSource.getRepository(Classroom);
        const classroom = await classroomRepo.findOneOrFail({ where: { id: classroomId } });
        await classroomRepo.remove(classroom);
        res.status(200);
    };

}

export default ClassroomController;
