import { role } from "../types/User";


export interface Customer {
    id?: number;
    email: string;
    password: string;
    name: string;
    role?: role
  }