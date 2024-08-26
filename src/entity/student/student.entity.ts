import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import Classroom from "../classroom/classroom.entity";
import { IRole } from "../../common/interfaces";

@Entity()
export class Student extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { length: '250' })
    name: string;

    @Column('varchar', { length: '250' })
    email: string;

    @Column('varchar', { length: '250' })
    password: string;

    @ManyToMany(() => Classroom, (classroom) => classroom.students)
    @JoinTable()
    classrooms: Classroom[];

    // Replace hard coded 'STUDENT' with ENUM;
    @Column('varchar', { default: 'STUDENT', length: '250' })
    role: keyof IRole;
}