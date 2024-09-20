import { Request, Response } from 'express';
import LessonService from '../services/LessonService';
import { Lesson } from '../models/Lesson';
import { role, User } from '../types/User';

class LessonController {
  async createLesson(req: Request, res: Response): Promise<void> {
    try {
      const { title, content, images, classroomId } = req.body;
      const user = req.User as User;
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

  async getLessonContent(req: Request, res: Response): Promise<void> {
    try {
    const lessonId = Number(req.query.lessonId);
    if(!lessonId) {
      res.status(400).json({ message: 'Lesson ID is required in the query'})
    }

    const lessonContent = await LessonService.getLessonWhithId(lessonId);

    res.status(200).json(lessonContent);

    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'lesson not found') {
          res.status(404).json({ message: error.message });
        } else {
          res.status(500).json({ message: 'Error fetching lesson content', error: error.message });
        }
      } else {
        res.status(500).json({ message: 'Unknown error occurred' });
      }
    }
  }
}

export default new LessonController();
