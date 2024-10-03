import { Router } from 'express';
import ClassController from '../controllers/ClassController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/createClass', authMiddleware, ClassController.createClass);
router.post('/insertInClass', authMiddleware, ClassController.insertInClass);
router.get('/listClassCards', authMiddleware, ClassController.listClassCards);
router.get('/listClassInfosToFront', authMiddleware, ClassController.getClassInfosToFront);

export default router;
