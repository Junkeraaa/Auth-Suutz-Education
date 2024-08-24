import dataSource from "../../config/datasource";

import { Response } from "express";

import Classroom from "../../entity/classroom/classroom.entity";
import { Teacher } from "../../entity/teacher/teacher.entity";


interface CreateClassroomInput {
    name: string;
    teacherId: string;
}
interface UpdateClassroomInput {}
interface DeleteClassroomInput {}
interface CreateLessonInput {}
interface UpdateLessonInput {}
interface DeleteLessonsInput {}



class ClassroomController { 
    async createClassroom (classroomInput: CreateClassroomInput, res: Response): Promise<void> {
        try {
            const { name, teacherId } = classroomInput;
            const teacherRepo = dataSource.getRepository(Teacher);
            const classroomRepo = dataSource.getRepository(Classroom);
            const teacher = await teacherRepo.findOneOrFail({ where: { id: teacherId } });
            const classroom = classroomRepo.create();
            classroom.name = name;
            classroom.teacher = teacher;
            const { id } = await classroom.save();

            res.status(201).json({ id });
        } catch (error: any) { 
            if (error.message === 'Only teachers can create classrooms') {
                res.status(406).json({ message: error.message });
            } else {
                res.status(400).json({ message: error.message });
            }
        }
    }

    async updateClassroom(){};
    async deleteClassroom(){};
    async createLesson(){};
    async updateLesson(){};
    async deleteLessons(){};

}

export default ClassroomController;
