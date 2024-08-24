import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import Classroom from "../classroom/classroom.entity";

@Entity()
export class Student extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { length: '250' })
    name: string;

    @Column('varchar', { length: '250' })
    email: string;

    @Column('varchar', { length: '250' })
    password: string;

    @ManyToMany(() => Classroom)
    @JoinTable()
    classrooms: Classroom[];

    // Replace hard coded 'STUDENT' with ENUM;
    @Column('varchar', { default: 'STUDENT', length: '250' })
    role: string = 'STUDENT';
}