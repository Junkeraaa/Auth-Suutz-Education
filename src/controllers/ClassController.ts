import { Request, Response } from 'express';
import classService from '../services/ClassService';

class ClassController { 
    async createClass(req: Request, res: Response): Promise<void> {
        try {
            const { teacherId, className } = req.body;
            const classId = await classService.createClass(teacherId, className);
            res.status(201).json({ classId });
        } catch (error: any) { 
            if (error.message === 'Only teachers can create classrooms') {
                res.status(406).json({ message: error.message });
            } else {
                res.status(400).json({ message: error.message });
            }
        }
    }

    async insertInClass(req: Request, res: Response): Promise<void> {
        try {
            const { classroomId, customerid } = req.body;
            const classMemberId = await classService.joinInClass(customerid, classroomId);
            res.status(201).json({ classMemberId });
        } catch (error: any) { 
            if (error.message === 'msg de error') {
                res.status(406).json({ message: error.message });
            } else {
                res.status(400).json({ message: error.message });
            }
        }
    }
}

export default new ClassController();
