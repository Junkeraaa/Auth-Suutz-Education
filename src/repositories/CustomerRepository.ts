import pool from '../config/database';
import { Customer } from '../models/Customer';

class CustomerRepository {
  async createCustomer(Customer: Customer): Promise<number> {

    const [result] = await pool.query(
      'INSERT INTO customer (email, password, name) VALUES (?, ?, ?)',
      [Customer.email, Customer.password, Customer.name]
    );
    return (result as any).insertId;
  }

  async findCustomerByEmail(email: string): Promise<Customer | null> {
    const [rows] = await pool.query('SELECT * FROM customer WHERE email = ?', [email]);
    if ((rows as Customer[]).length) {
      return (rows as Customer[])[0];
    }
    return null;
  }

  async findCustomerById(CustomerId : number): Promise<Customer | null> {
    const [rows] = await pool.query('SELECT * FROM customer WHERE id = ?', [CustomerId]);
    if ((rows as Customer[]).length) {
      return (rows as Customer[])[0];
    }
    return null;
  }
}

export default new CustomerRepository();
