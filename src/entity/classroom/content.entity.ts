import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Lesson from "./lesson.entity";



@Entity()
export default class Content extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { length: '255' })
    
    fileUrl: string;

    @ManyToOne(() => Lesson)
    lesson: Lesson; 
}