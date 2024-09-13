import { Router } from 'express';
import ClassController from '../controllers/ClassController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/createClass', authMiddleware, ClassController.createClass);
router.post('/insertInClass', authMiddleware, ClassController.insertInClass);
router.post('/listClassCards', authMiddleware, ClassController.listClassCards);

export default router;
