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
}

export default new LessonImageRepository();
