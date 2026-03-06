import mysql, { type Connection } from 'mysql2/promise';

const dbConfig = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'Tech_Solutions',
};

let connection: Connection | null = null;

function getConnection(): Connection {
  if (!connection) throw new Error('La conexion a la base de datos no esta activa. Llama a connect() primero.');
  return connection;
}

export async function connect(): Promise<void> {
  if (!connection) {
    connection = await mysql.createConnection(dbConfig);
    console.log('Conexion a la base de datos establecida');
  }
}

export async function close(): Promise<void> {
  if (connection) {
    await connection.end();
    connection = null;
    console.log('Conexion a la base de datos cerrada');
  }
}

export async function callList<T>(sp: string, params: unknown[] = []): Promise<T[]> {
  const [resultSets] = await getConnection().query(`CALL ${sp}`, params);
  return ((resultSets as unknown[][])?.[0] ?? []) as T[];
}

export async function callVoid(sp: string, params: unknown[] = []): Promise<void> {
  await getConnection().query(`CALL ${sp}`, params);
}

export async function query(sql: string, params: unknown[] = []): Promise<void> {
  await getConnection().query(sql, params);
}
