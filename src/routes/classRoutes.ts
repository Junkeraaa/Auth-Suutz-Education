import { Router } from 'express'
import ClassController from '../controllers/ClassController';


const router = Router();

router.post('/createClass', ClassController.createClass)

export default router;