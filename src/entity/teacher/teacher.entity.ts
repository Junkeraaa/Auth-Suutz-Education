import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Classroom from "../classroom/classroom.entity";
import { IRole } from "../../common/interfaces";





@Entity()
export class Teacher extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { length: '255' })
    name: string
    
    @Column('varchar', { length: '255' })
    email: string
    
    @Column('varchar', { length: '255' })
    password: string
    
    @Column('varchar', { length: '255', unique: true })
    cpf: string

    @OneToMany(() => Classroom, (classroomm) => classroomm.teacher)
    classrooms: Classroom[]; 

    @Column('varchar', { default: 'TEACHER', length: '250' })
    role: keyof IRole;

};