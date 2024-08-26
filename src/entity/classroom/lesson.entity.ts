import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Student } from "../student/student.entity";
import { Teacher } from "../teacher/teacher.entity";
import Classroom from "./classroom.entity";
import Content from "./content.entity";



@Entity()
export default class Lesson extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { length: '255' })
    title: string

    @Column('varchar', { length: '255' })
    descricao: string;
    
    @ManyToOne(() => Classroom, { onDelete: 'CASCADE' })
    classroom: Classroom;

    @OneToMany(() => Content, (content) => content.lesson)
    content: Content[]
}