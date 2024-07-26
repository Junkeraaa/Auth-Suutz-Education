import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import CustomerRepository from '../repositories/CustomerRepository';
import { jwtSecret, jwtExpiresIn } from '../config/config';
import TeacherRepository from '../repositories/TeacherRepository';
import { jwtLoginInterface } from '../types/jwtLoginInterface';
import ClassroomMemberRepository from '../repositories/ClassroomMemberRepository';


class AuthService {
  async registerCustomer (email: string, password: string, name: string): Promise<string> {
    const existingCustomer = await CustomerRepository.findCustomerByEmail(email);
    if (existingCustomer) {
      throw new Error('Customer with this email already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const customerId = await CustomerRepository.createCustomer({ email, password: hashedPassword, name });
    await ClassroomMemberRepository.insertInClass({classId: 1, customerId: customerId});
    return this.generateToken({ id: customerId, email, name });
  }

  async loginCustomer(email: string, password: string): Promise<string> {
    const customer = await CustomerRepository.findCustomerByEmail(email);
    if (!customer || !(await bcrypt.compare(password, customer.password))) {
      throw new Error('Invalid email or password');
    }
    return this.generateToken({ id: customer.id!, email: customer.email, name: customer.name, role: "aluno" });
  }

  async registerTeacher (email: string, password: string, name: string): Promise<string> {
    const existingTeacher = await TeacherRepository.findTeacherByEmail(email);
    if (existingTeacher) {
      throw new Error('Teacher with this email already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const  teacherId = await TeacherRepository.createTeacher({ email, password: hashedPassword, name });
    await ClassroomMemberRepository.insertInClass({classId: 1, customerId: teacherId});
    return this.generateToken({ id: teacherId, email, name });
  }

  async loginTeacher(email: string, password: string): Promise<string> {
    const teacher = await TeacherRepository.findTeacherByEmail(email);
    if (!teacher || !(await bcrypt.compare(password, teacher.password))) {
      throw new Error('Invalid email or password');
    }
    return this.generateToken({ id: teacher.id!, email: teacher.email, name: teacher.name, role: "professor" });
  }

  private generateToken(teacher: Partial<jwtLoginInterface> ): string {
    return jwt.sign(teacher, jwtSecret, { expiresIn: jwtExpiresIn });
  }
}

export default new AuthService();
