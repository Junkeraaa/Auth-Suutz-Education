import { Router } from 'express'
import ClassroomController from '../controllers/classroom/classroom.controller';


const router = Router();

router.post('/createClass', (req, res) => {
    const controller = new ClassroomController();
    controller.createClassroom(req.body, res);
})

export default router;