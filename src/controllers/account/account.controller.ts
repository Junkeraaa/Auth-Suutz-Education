import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { jwtSecret, jwtExpiresIn } from '../../config/config';
import dataSource from '../../config/datasource';
import { Student } from '../../entity/student/student.entity';
import { UserContext } from '../../common/interfaces';
import { Teacher } from '../../entity/teacher/teacher.entity';
import { Request } from 'express';



interface RegisterTeacherInput {
    name: string;
    email: string;
    cpf: string;
    password: string;

}
interface RegisterStudentInput {
    name: string;
    email: string;
    password: string;
}

export default class AccountController {
    async registerTeacher({ email, name, password, cpf }: RegisterTeacherInput, req: Request & UserContext) {
        const teacherRepository = dataSource.getRepository(Teacher);
        const existingTeacher = await teacherRepository.findOne({ where: { email } });

        if (existingTeacher) {
          throw new Error('Teacher with this email already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const student = teacherRepository.create({ cpf, name, email, password: hashedPassword, role: 'TEACHER' });
        
        return teacherRepository.save(student);
    }


    // TODO: Need to discuss if  a teacher can register a student.
    async registerStudent({ email, name, password }: RegisterStudentInput, req: Request & UserContext) {
        const studentRepository = dataSource.getRepository(Student);
        const existingStudent = await studentRepository.findOne({ where: { email } });

        if (existingStudent) {
          throw new Error('Student with this email already exists');
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);
        const student = studentRepository.create({ name, email, password: hashedPassword, role: 'STUDENT' });
        
        return studentRepository.save(student);
    }

    async loginAsStudent(email: string, password: string): Promise<string> {
        const studentRepository = dataSource.getRepository(Student);
        const student = await studentRepository.findOneOrFail({ where: { email } });
        
        const isPasswordCorrect = await bcrypt.compare(password, student.password);
        if(!isPasswordCorrect) {
            throw new Error('Invalid password');
        }
        
        const token = this.generateToken({ id: student.id, email: student.email, role: 'STUDENT' });
        return token;
        
    }
    
    async loginAsTeacher(email: string, password: string): Promise<string> {
        const teacherRepository = dataSource.getRepository(Teacher);
        const teacher = await teacherRepository.findOneOrFail({ where: { email } });

        if(!(await bcrypt.compare(password, teacher.password))) {
            throw new Error('Invalid password');
        }
        
        
        return this.generateToken({ id: teacher.id, email: teacher.email, role: 'TEACHER' });
    }

    private generateToken(user: UserContext['user']): string {
        return jwt.sign(user, jwtSecret, { expiresIn: jwtExpiresIn });
    }
};