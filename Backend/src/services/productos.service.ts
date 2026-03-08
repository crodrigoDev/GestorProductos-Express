import { getConnection } from '../config/database';
import type { FiltrosProducto, Producto, CrearProducto } from '../types';

export async function listarProductos(filters: FiltrosProducto): Promise<Producto[]> {
  const [rows] = await getConnection().query('CALL sp_listarProductosFiltro(?, ?, ?)', [filters.estado, filters.marca, filters.categoria]);
  return ((rows as unknown[][])?.[0] ?? []) as Producto[];
}

export async function cambiarEstadoProducto(idProducto: number, idEstado: number): Promise<void> {
  await getConnection().query('CALL sp_cambiarEstado(?, ?)', [idProducto, idEstado]);
}

export async function agregarProducto(p: CrearProducto): Promise<void> {
  await getConnection().query('CALL sp_crearProducto(?, ?, ?, ?, ?, ?, ?, ?, ?)', [
    p.nombre, p.id_marca, p.id_categoria, p.descripcion,
    p.precio, p.stock, p.stock_min, p.stock_max, p.id_estado,
  ]);
}

export async function editarProducto(id: number, p: CrearProducto): Promise<void> {
  await getConnection().query('CALL sp_editarProducto(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
    id, p.nombre, p.id_marca, p.id_categoria, p.descripcion,
    p.precio, p.stock, p.stock_min, p.stock_max, p.id_estado,
  ]);
}

export async function obtenerProductoPorId(id: number): Promise<CrearProducto | null> {
  const [rows] = await getConnection().query('CALL sp_listarProductoId(?)', [id]);
  const data = (rows as unknown[][])?.[0] as CrearProducto[] | undefined;
  return data?.[0] ?? null;
}

export async function eliminarProducto(id: number): Promise<void> {
  await getConnection().query('CALL sp_eliminarProducto(?)', [id]);
}

