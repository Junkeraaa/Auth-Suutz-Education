import { Request, Response } from 'express';
import classService from '../services/ClassService';
import { role, User } from '../types/User';


class ClassController {
    async createClass(req: Request, res: Response): Promise<void> {
        try {
            const user = req.User as User;
            if (user.role !== role.PROFESSOR) {
                res.status(403).json({ message: 'Access denied: only professors can create classes' });
                return;
            }

            console.log(user)

            const { className } = req.body;

            console.log('className', className)
            const classId = await classService.createClass(user.id, className);
            res.status(201).json({ classId });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    } 

    async insertInClass(req: Request, res: Response): Promise<void> {
        try {
            
            const user = req.User as User;

            console.log(user)

            
            if (user.role !== role.STUDENT) {
                res.status(403).json({ message: 'Access denied: only students can join classes' });
                return;
            }

           
            const { classroomId } = req.body;
            const customerId = user.id; 

           
            const classMemberId = await classService.joinInClass(customerId, classroomId);
            res.status(201).json({ classMemberId });
        } catch (error: any) {
            if (error.message === 'This class does not exist!') {
                res.status(404).json({ message: error.message });
            } else {
                res.status(400).json({ message: error.message });
            }
        }
    }

    async listClassCards(req: Request, res: Response): Promise<void> {
        try {
            const user = req.User as User;
            const classCards = await classService.listClass(user.id);
            res.status(200).json(classCards.length ? classCards : { message: "No classes found!" });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async getAllLessons(req: Request, res: Response): Promise<void> {
        try {
            const { classroomId } = req.params;
            const lessons = await classService.getAllLessons(Number(classroomId));
            res.status(200).json(lessons);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async getAllStudents(req: Request, res: Response): Promise<void> {
        try {
            const { classroomId } = req.params;
            const students = await classService.getAllStudents(Number(classroomId));
            res.status(200).json(students);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}

export default new ClassController();
