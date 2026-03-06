import { RowDataPacket } from 'mysql2';
import { pool } from '../config/database';

export type Estado = {
  id: number;
  detalle: string;
};

export async function listarEstados(): Promise<Estado[]> {
  const [resultSets] = await pool.query<RowDataPacket[][]>('CALL sp_listarEstados()');
  return (resultSets?.[0] ?? []) as unknown as Estado[];
}
