import mysql, { Pool } from 'mysql2/promise';

class Database {
  private static instance: Pool;

  private constructor() {}

  static getInstance(): Pool {
    if (!Database.instance) {
      Database.instance = mysql.createPool({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: 'Tech_Solutions',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      });
    }

    return Database.instance;
  }
}

const pool = Database.getInstance();

export { pool };
