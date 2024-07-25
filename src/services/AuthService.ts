import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import userRepository from '../repositories/UserRepository';
import ClassManagerRepository from '../repositories/ClassManagerRepository'
import ClassMembersRepository from '../repositories/ClassMembersRepository';
import { jwtSecret, jwtExpiresIn } from '../config/config';

class AuthService {
  async register(email: string, password: string, role: 'professor' | 'aluno', classId: number | null | undefined ): Promise<string> {
    const existingUser = await userRepository.findUserByEmail(email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
    const existingClass = await ClassManagerRepository.findClass(classId);
        if(!existingClass) {
            throw new Error('This class does not exist!')
        }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await userRepository.createUser({ email, password: hashedPassword, role });
    if(!classId){
      classId = 1;
    }
    const ClassMemberId = await ClassMembersRepository.insertInClass({classId,  userId});
    
    return this.generateToken({ id: userId, email, role });
  }

  async login(email: string, password: string): Promise<string> {
    const user = await userRepository.findUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid email or password');
    }
    return this.generateToken({ id: user.id!, email: user.email, role: user.role });
  }

  private generateToken(user: Partial<User>): string {
    return jwt.sign(user, jwtSecret, { expiresIn: jwtExpiresIn });
  }
}

export default new AuthService();
