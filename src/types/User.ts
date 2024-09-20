

export enum role { 
    PROFESSOR = 'professor',
    STUDENT = 'student'
}

export interface User {
    id: number;
    email: string;
    name: string;
    role: role.PROFESSOR | role.STUDENT
}