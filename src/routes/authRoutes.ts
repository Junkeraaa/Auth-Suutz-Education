import { Router } from 'express';
import authController from '../controllers/AuthController';

const router = Router();

router.post('/register/customer', authController.registerCustomer);
router.post('/login/customer', authController.loginCustomer);
router.post('/register/Teacher', authController.registerTeacher);
router.post('/login/Teacher', authController.loginTeacher);

export default router;
