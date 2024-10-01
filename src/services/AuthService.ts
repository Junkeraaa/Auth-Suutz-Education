import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import CustomerRepository from '../repositories/CustomerRepository';
import { jwtSecret, jwtExpiresIn } from '../config/config';
import TeacherRepository from '../repositories/TeacherRepository';
import ClassroomMemberRepository from '../repositories/ClassroomMemberRepository';
import { Teacher } from '../models/Teacher';
import { Customer } from '../models/Customer';
import { role } from "../types/User";


class AuthService {
  async registerCustomer (email: string, password: string, name: string): Promise<string> {
    const existingCustomer = await CustomerRepository.findCustomerByEmail(email);
    if (existingCustomer) {
      throw new Error('Customer with this email already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const customerId = await CustomerRepository.createCustomer({ email, password: hashedPassword, name });
    await ClassroomMemberRepository.insertInClass({classId: 1, customerId: customerId});
    return this.generateCustomerToken({ id: customerId, email, name, role: role.STUDENT });
  }

  async loginCustomer(email: string, password: string): Promise<string> {
    const customer = await CustomerRepository.findCustomerByEmail(email);
    if (!customer || !(await bcrypt.compare(password, customer.password))) {
      throw new Error('Invalid email or password');
    }
    return this.generateCustomerToken({ id: customer.id!, email: customer.email, name: customer.name, role: customer.role });
  }

  async registerTeacher (email: string, password: string, name: string): Promise<string> {
    const existingTeacher = await TeacherRepository.findTeacherByEmail(email);
    if (existingTeacher) {
      throw new Error('Teacher with this email already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const  teacherId = await TeacherRepository.createTeacher({ email, password: hashedPassword, name });
    return this.generateCustomerToken({ id: teacherId, email, name, role: role.PROFESSOR });
  }

  async loginTeacher(email: string, password: string): Promise<string> {
    const teacher = await TeacherRepository.findTeacherByEmail(email);
    if (!teacher || !(await bcrypt.compare(password, teacher.password))) {
      throw new Error('Invalid email or password');
    }
    return this.generateTeacherToken({ id: teacher.id!, email: teacher.email, name: teacher.name, role:  teacher.role });
  }

  private generateTeacherToken(teacher: Partial<Teacher> ): string {
    return jwt.sign(teacher, jwtSecret, { expiresIn: jwtExpiresIn });
  }

  private generateCustomerToken(customer: Partial<Customer> ): string {
    return jwt.sign(customer, jwtSecret, { expiresIn: jwtExpiresIn });
  }
}

export default new AuthService();
