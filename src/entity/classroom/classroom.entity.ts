import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Student } from "../student/student.entity";
import { Teacher } from "../teacher/teacher.entity";
import Lesson from "./lesson.entity";



@Entity()
export default class Classroom extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { length: '255' })
    name: string

    @ManyToMany(() => Student, (student) => student.classrooms, { cascade: true, onDelete: 'CASCADE' })
    students: Student[];
    
    @ManyToOne(() => Teacher)
    teacher: Teacher;

    @OneToMany(() => Lesson, (lesson) => lesson.classroom, { cascade: true, onDelete: 'CASCADE' })
    lesson: Lesson[]; 
}