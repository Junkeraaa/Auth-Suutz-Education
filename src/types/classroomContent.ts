
import { Lesson } from "../models/Lesson";

export interface classroomContent {
    lessons: Lesson[],
    membersName: String[],
    classroomName: string,
}