import { createPool } from 'mysql2/promise';

const pool = createPool({
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: '12345',
  database: 'sivt',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;
