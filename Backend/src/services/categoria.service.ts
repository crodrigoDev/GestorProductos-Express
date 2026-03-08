import { getConnection } from '../config/database';
import type { Categoria, CategoriaConCount } from '../types';

export async function listarCategoria(): Promise<Categoria[]> {
  const [rows] = await getConnection().query('CALL sp_listarCategoria()');
  return ((rows as unknown[][])?.[0] ?? []) as Categoria[];
}

export async function listarCategoriaConCount(): Promise<CategoriaConCount[]> {
  const [rows] = await getConnection().query('CALL sp_listarCategoriaContar()');
  return ((rows as unknown[][])?.[0] ?? []) as CategoriaConCount[];
}

export async function crearCategoria(detalle: string): Promise<void> {
  await getConnection().query('CALL sp_crearCategoria(?)', [detalle]);
}

export async function obtenerCategoriaPorId(id: number): Promise<Categoria | null> {
  const [rows] = await getConnection().query('CALL sp_listarCategoriaId(?)', [id]);
  const data = (rows as unknown[][])?.[0] as Categoria[] | undefined;
  return data?.[0] ?? null;
}

export async function editarCategoria(id: number, detalle: string): Promise<void> {
  await getConnection().query('CALL sp_editarCategoria(?, ?)', [id, detalle]);
}
