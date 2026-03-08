import { getConnection } from '../config/database';
import type { Marca, MarcaConCount } from '../types';

export async function listarMarcas(): Promise<Marca[]> {
  const [rows] = await getConnection().query('CALL sp_listarMarcas()');
  return ((rows as unknown[][])?.[0] ?? []) as Marca[];
}

export async function listarMarcasConCount(): Promise<MarcaConCount[]> {
  const [rows] = await getConnection().query('CALL sp_listarMarcasContar()');
  return ((rows as unknown[][])?.[0] ?? []) as MarcaConCount[];
}

export async function crearMarca(detalle: string): Promise<void> {
  await getConnection().query('CALL sp_crearMarca(?)', [detalle]);
}

export async function obtenerMarcaPorId(id: number): Promise<Marca | null> {
  const [rows] = await getConnection().query('CALL sp_listarMarcaId(?)', [id]);
  const data = (rows as unknown[][])?.[0] as Marca[] | undefined;
  return data?.[0] ?? null;
}

export async function editarMarca(id: number, detalle: string): Promise<void> {
  await getConnection().query('CALL sp_editarMarca(?, ?)', [id, detalle]);
}
