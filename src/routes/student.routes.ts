import { Router } from 'express'
import { ApplicationRequest } from '../common/interfaces';
import { authMiddleware } from '../middlewares/authMiddleware';

import StudentController from '../controllers/student/student.classroom.controller';

const router = Router();


const studentController = new StudentController();


// TODO
router.post('/listStudent?', authMiddleware, async (req, res) => {
    try {
        const { id: studentId, classroomId } = req.params;
        const classroom = await studentController.enterClassroom({ classroomId, studentId }, req as ApplicationRequest, res);
        res.send({ data: classroom });
    } catch(e: any) {
        res.status(400).send({ error: e.message });
    }
})


router.post('/:id/enterClassroom/:classroomId', authMiddleware, async (req, res) => {
    try {
        const { id: studentId, classroomId } = req.params;
        const classroom = await studentController.enterClassroom({ classroomId, studentId }, req as ApplicationRequest, res);
        res.send({ data: classroom });
    } catch(e: any) {
        res.status(400).send({ error: e.message });
    }
});


router.post('/:id/exitClassroom/:classroomId', authMiddleware, async (req, res) => {
    try {
        const { id: studentId, classroomId } = req.params;
        await studentController.exitClassroom({ classroomId, studentId }, req as ApplicationRequest, res);
        res.status(200).end();
    } catch(e: any) {
        res.status(400).send({ error: e.message });
    }
});

export default router;