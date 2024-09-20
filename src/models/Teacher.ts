import { role } from "../types/User";
export interface Teacher {
    id?: number;
    email: string;
    password: string;
    name: string;
    role?: role
  }