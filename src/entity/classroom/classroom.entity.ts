import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Student } from "../student/student.entity";
import { Teacher } from "../teacher/teacher.entity";



@Entity()
export default class Classroom extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { length: '255' })
    name: string

    @ManyToMany(() => Student)
    students: Student[];
    
    @ManyToOne(() => Teacher)
    teacher: Teacher;
}