import { Customer } from "../models/Customer";

export interface jwtLoginInterface extends Customer {
    role: string;
  }