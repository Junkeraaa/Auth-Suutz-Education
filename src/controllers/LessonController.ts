import { Request, Response } from 'express';
import LessonService from '../services/LessonService';
import { Lesson } from '../models/Lesson';
import { role } from '../types/User';

class LessonController {
  async createLesson(req: Request, res: Response): Promise<void> {
    try {
      const { title, content, images, classroomId } = req.body;
      const { user } = req as any;
      if((user.role !== role.PROFESSOR)){
        res.status(404).json({ message: 'Only professors can be create lessons'});
      }

      if (!title || !content) {
        res.status(400).json({ message: 'Title and content are required' });
        return;
      }

      const lesson: Lesson = {
        classroomId: classroomId,
        title,
        content
      };

      await LessonService.createLessonWithImages(lesson, images || []);
      res.status(201).json({ message: 'Lesson created successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error creating lesson', error });
    }
  }
}

export default new LessonController();
