import LessonRepository from '../repositories/LessonRepository';
import LessonImageRepository from '../repositories/LessonImageRepository';
import { Lesson } from '../models/Lesson';
import { LessonImage } from '../models/LessonImage';


class LessonService {
  async createLessonWithImages(lesson: Lesson, images: string[]): Promise<void> {
    const lessonId = await LessonRepository.createLesson(lesson);
    for (const imageUrl of images) {
      const lessonImage: LessonImage = { lessonId, imageUrl };
      await LessonImageRepository.addLessonImage(lessonImage);
    }
  }
}

export default new LessonService();
