import dataSource from "../../config/datasource";

import { response, Response } from "express";
import Lesson from "../../entity/classroom/lesson.entity";
import Classroom from "../../entity/classroom/classroom.entity";
import Content from "../../entity/classroom/content.entity";
import canPerformAction from "../common/canPerformAction";
import { ApplicationRequest, Roles } from "../../common/interfaces";





interface CreateLessonInput {
    title: string;
    descricao: string;
    classroomId: string;
    content: {
        fileUrl: string;
    }[];
}

interface UpdateLessonInput extends CreateLessonInput {
    id: string;
};

interface ListLessonInput {
    id?: string | undefined;
    classroomId: string;
}

class LessonControlleer { 
    async listLesson({ id, classroomId }: ListLessonInput, req: ApplicationRequest, res: Response): Promise<Lesson[]> {
        const lessonRepository = dataSource.getRepository(Lesson);
        const classroomRepository = dataSource.getRepository(Classroom);

        const classroom = await classroomRepository.findOneOrFail({ where: { id: classroomId } });

        if(id) {
            return lessonRepository.find({ where: { id } });
        }
        
        return lessonRepository.find({ where: { classroom }, relations: { classroom: true, content: true }});
    };

    async createLesson({ title, descricao, classroomId, content }: CreateLessonInput, req: ApplicationRequest, res: Response) {
        canPerformAction(req, Roles.TEACHER);

        const lessonRepository = dataSource.getRepository(Lesson);
        const contentRepository = dataSource.getRepository(Content);
        const classroomRepository = dataSource.getRepository(Classroom);
    
        const classroom = await classroomRepository.findOneOrFail({ where: { id: classroomId } });
    
        const lesson = lessonRepository.create({ classroom, descricao, title });
    
        await lessonRepository.save(lesson);
    
        const contents = await Promise.all(content.map(item => {
            const contentEntity = contentRepository.create({ fileUrl: item.fileUrl, lesson });
            return contentRepository.save(contentEntity);
        }));
    
        lesson.content = contents;
    
        await lessonRepository.save(lesson);
    
        return lesson;

    };
    async updateLesson(lessonToUpdate: UpdateLessonInput) {
        //canPerformAction(req, Role.TEACHER);


    };
    async deleteLesson(){};
}

export default LessonControlleer;
