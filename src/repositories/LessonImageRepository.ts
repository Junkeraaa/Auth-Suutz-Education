import pool from '../config/database';

import { LessonImage } from '../models/LessonImage';



class LessonImageRepository {
  async addLessonImage(lessonImage: LessonImage): Promise<number> {
    const [result] = await pool.query(
      'INSERT INTO lesson_image (lesson_id, image_url) VALUES (?, ?)',
      [lessonImage.lessonId, lessonImage.imageUrl]
    );
    return (result as any).insertId;
  }

  async getLessonImagesById(lessonId: number): Promise<LessonImage[]> {
    const [rows] = await pool.query('SELECT id, lesson_id AS lessonId, image_url AS imageUrl FROM lesson_image WHERE lesson_id = ?', [lessonId]);
        return rows as LessonImage[];
  }
}

export default new LessonImageRepository();
