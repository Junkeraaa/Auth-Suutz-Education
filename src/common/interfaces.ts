import { Request } from "express";


interface IRole {
    STUDENT: string;
    TEACHER: string;
}

const Roles: IRole = {
    STUDENT: 'STUDENT',
    TEACHER: 'TEACHER'
}

interface UserContext {
    user: {
        id: string;
        email: string;
        role: keyof IRole;
    }
}

type ApplicationRequest = Request & UserContext;

export { Roles, IRole,  UserContext, ApplicationRequest};