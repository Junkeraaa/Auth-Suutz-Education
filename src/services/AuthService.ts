import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import CustomerRepository from '../repositories/CustomerRepository';
import { jwtSecret, jwtExpiresIn } from '../config/config';
import TeacherRepository from '../repositories/TeacherRepository';
import ClassroomMemberRepository from '../repositories/ClassroomMemberRepository';
import { Teacher } from '../models/Teacher';
import { Customer } from '../models/Customer';
import { role } from "../types/User";
import { Auth } from '../types/authTypes';


class AuthService {
  async registerCustomer (email: string, password: string, name: string): Promise<Auth> {
    const existingCustomer = await CustomerRepository.findCustomerByEmail(email);
    if (existingCustomer) {
      throw new Error('Customer with this email already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const customerId = await CustomerRepository.createCustomer({ email, password: hashedPassword, name });
    await ClassroomMemberRepository.insertInClass({classId: 1, customerId, customerName: name});
    
    const token = this.generateCustomerToken({ id: customerId, email, name, role: role.STUDENT });
    return {
      name,
      id: customerId,
      role: role.STUDENT,
      token
    }
  }

  async loginCustomer(email: string, password: string): Promise<Auth> {
    const customer = await CustomerRepository.findCustomerByEmail(email);
    if (!customer || !(await bcrypt.compare(password, customer.password))) {
      throw new Error('Invalid email or password');
    }
    const token = this.generateCustomerToken({ id: customer.id!, email: customer.email, name: customer.name, role: customer.role });

    return {
      name: customer.name,
      id: customer.id!,
      role: role.STUDENT,
      token
    }
  }

  async registerTeacher (email: string, password: string, name: string): Promise<Auth> {
    const existingTeacher = await TeacherRepository.findTeacherByEmail(email);
    if (existingTeacher) {
      throw new Error('Teacher with this email already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const  teacherId = await TeacherRepository.createTeacher({ email, password: hashedPassword, name });
    const token =  this.generateCustomerToken({ id: teacherId, email, name, role: role.PROFESSOR });

    return {
      name,
      id: teacherId,
      role: role.PROFESSOR,
      token
    }
  }

  async loginTeacher(email: string, password: string): Promise<Auth> {
    const teacher = await TeacherRepository.findTeacherByEmail(email);
    if (!teacher || !(await bcrypt.compare(password, teacher.password))) {
      throw new Error('Invalid email or password');
    }
    const token = this.generateTeacherToken({ id: teacher.id!, email: teacher.email, name: teacher.name, role:  teacher.role });
    return {
      name: teacher.name,
      id: teacher.id!,
      role: role.PROFESSOR,
      token
    }
  }

  private generateTeacherToken(teacher: Partial<Teacher> ): string {
    return jwt.sign(teacher, jwtSecret, { expiresIn: jwtExpiresIn });
  }

  private generateCustomerToken(customer: Partial<Customer> ): string {
    return jwt.sign(customer, jwtSecret, { expiresIn: jwtExpiresIn });
  }
}

export default new AuthService();
