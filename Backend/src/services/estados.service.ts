import { getConnection } from '../config/database';
import type { Estado } from '../types';

export async function listarEstados(): Promise<Estado[]> {
  const [rows] = await getConnection().query('CALL sp_listarEstados()');
  return ((rows as unknown[][])?.[0] ?? []) as Estado[];
}
