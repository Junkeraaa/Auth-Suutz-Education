import { Router } from 'express'
import ClassController from '../controllers/ClassController';


const router = Router();

router.post('/createClass', ClassController.createClass)
router.post('/insertInClass', ClassController.insertInClass)

export default router;