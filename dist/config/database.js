"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = require("mysql2/promise");
const pool = (0, promise_1.createPool)({
    host: 'localhost',
    port: 3306, // Porta do MySQL
    user: 'root',
    password: 'Db3264128jn!',
    database: 'Sivt',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
exports.default = pool;
