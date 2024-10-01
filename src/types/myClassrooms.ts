export interface myClassrooms {
  nameClassroom: string;
  nameProfessor: string;
  membersClassroom: number;
  availableLessons: number;
}

export interface ClassroomInfo {
  classroomName: string;
  teacherId: number;
}

export interface LessonInfo {
  lessonId: number;
  lessonName: string;
}

export interface MemberInfo {
  memberId: number;
  memberName: string;
}

export interface classroomId {
  classroomId: number;
}

export interface countMembersClass {
  numberOfMembers: number;
}
