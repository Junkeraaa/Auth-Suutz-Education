import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import userRepository from '../repositories/UserRepository';
import { jwtSecret, jwtExpiresIn } from '../config/config';

class AuthService {
  async register(email: string, password: string, role: 'professor' | 'aluno'): Promise<string> {
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await userRepository.createUser({ email, password: hashedPassword, role });
    return this.generateToken({ id: userId, email, role });
  }

  async login(email: string, password: string): Promise<string> {
    const user = await userRepository.findByEmail(email);
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
