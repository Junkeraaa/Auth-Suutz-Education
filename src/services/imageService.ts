import axios from 'axios';
import LessonImageRepository from '../repositories/LessonImageRepository';
import { LessonImage } from '../models/LessonImage';

class ImageService {

  async uploadImage(imageBase64: string, lessonId: number): Promise<number> {
    
    try {
      const response = await axios.post(
        'https://api.imgur.com/3/image',
        { image: imageBase64 },
        {
          headers: {
            Authorization: `Client-ID ${'503a2d3a385dc11'}`,
          },
        }
      );

      if (response.data.success) {
        const lessonImage: LessonImage = {
            lessonId: lessonId,
            imageUrl: response.data.data.link
        };
        
        return await LessonImageRepository.addLessonImage(lessonImage);
        
      } else {
        throw new Error('Falha ao fazer upload da imagem para Imgur');
      }
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error);
      throw new Error('Erro no upload da imagem');
    }
  }

}

export default new ImageService();
