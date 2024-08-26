import { Router } from 'express'
import ClassroomController from '../controllers/classroom/classroom.controller';
import LessonControlleer from '../controllers/classroom/lesson.controller';
import { ApplicationRequest } from '../common/interfaces';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

const classroomController = new ClassroomController();
const lessonController = new LessonControlleer();

router.post('/listClassroom?', authMiddleware, async (req, res) => {
    try {
        const { id } = req.query;
        const classroom = await classroomController.listClassroom(id as string, req as ApplicationRequest, res);
        res.send({ data: classroom });
    } catch(e: any) {
        res.status(400).send({ error: e.message });
    }
})

router.post('/createClassroom', authMiddleware, async (req, res) => {
    try {
        const { name, teacherId } = req.body;
        const classroom = await classroomController.createClassroom({ name, teacherId }, req as ApplicationRequest, res);
        res.send({ data: classroom });
    } catch(e: any) {
        res.status(400).send({ error: e.message });
    }
})

router.post('/:id/updateClassroom', authMiddleware, async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const affected = await classroomController.updateClassroom({ id, name }, req as ApplicationRequest, res);
        res.status(201).send({ data: { affected } });
    } catch (e: any) {
        res.status(400).send({ error: e.message });
    }
})

router.post('/:id/deleteClassroom', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const affected = await classroomController.deleteClassroom(id, req as ApplicationRequest, res);
        res.status(201).send({ data: { affected } });
    } catch (e: any) {
        res.status(400).send({ error: e.message });
    }
})





router.post('/:classroomId/listLesson?', authMiddleware, async (req, res) => {
    try {
        const { classroomId } = req.params;
        const { id } = req.query;
        const lessons = await lessonController.listLesson({ classroomId, id: id as string }, req as ApplicationRequest, res);
        res.send({ data: lessons });
    } catch(e: any) {
        res.status(400).send({ error: e.message })
    }
})
router.post('/:classroomId/createLesson', authMiddleware, async (req, res) => {
    try {
        const { title, descricao, content } = req.body;
        const { classroomId } = req.params;
        const lesson = await lessonController.createLesson({ classroomId, descricao, title, content }, req as ApplicationRequest, res);
        res.send({ data: lesson });
    } catch(e: any) {
        res.status(400).send({ error: e.message })
    }
});

export default router;