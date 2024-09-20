import { Router } from 'express';
import LessonController from '../controllers/LessonController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/createLesson', authMiddleware, LessonController.createLesson);

export default router;
