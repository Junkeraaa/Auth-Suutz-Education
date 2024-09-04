import { Router } from 'express';
import ClassController from '../controllers/ClassController';
import { authMiddleware } from '../middlewares/authMiddleware'; // ajuste o caminho conforme necessário

const router = Router();

// Adiciona o middleware de autenticação antes das funções
router.post('/createClass', authMiddleware, ClassController.createClass);
router.post('/insertInClass', authMiddleware, ClassController.insertInClass);

export default router;
