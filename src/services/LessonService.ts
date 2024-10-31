import LessonRepository from '../repositories/LessonRepository';
import LessonImageRepository from '../repositories/LessonImageRepository';
import { Lesson } from '../models/Lesson';
import { LessonImage } from '../models/LessonImage';
import { lessonContent } from '../types/lessonContent';


class LessonService {
  async createLessonWithImages(lesson: Lesson, images: string[]): Promise<void> {
    const lessonId = await LessonRepository.createLesson(lesson);
    for (const imageUrl of images) {
      const lessonImage: LessonImage = { lessonId, imageUrl };
      await LessonImageRepository.addLessonImage(lessonImage);
    }
  }

  async getLessonWhithId(lessonId: number): Promise<lessonContent> {
    const lessonImages = await LessonImageRepository.getLessonImagesById(lessonId);
    const imageArray: string[] = lessonImages.map(objeto => objeto.imageUrl);
    const lesson = await LessonRepository.getLessonById(lessonId);

    if(!lesson){
      throw new Error("lesson not found");
    }
    
    return {
      title: lesson?.title,
      content: lesson?.content,
      imagesUrl: imageArray,
    }

  }

  async updateLessonContent(lessonId: number, content: string): Promise<void>{
    const lessonUpdated = await LessonRepository.editLessonContent(lessonId, content);
    if(lessonUpdated == false){
      throw new Error("Não foi possível alterar a lição")
    }
  }
}

export default new LessonService();
