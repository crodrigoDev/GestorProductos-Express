import { RowDataPacket } from 'mysql2';
import { pool } from '../config/database';
import type { FiltrosProducto, Producto, CrearProducto } from '../types';

export async function listarProductos(filters: FiltrosProducto): Promise<Producto[]> {
  const [resultSets] = await pool.query<RowDataPacket[][]>(
    'CALL sp_listarProductosFiltro(?, ?, ?)',
    [filters.estado, filters.marca, filters.categoria]
  );

  return (resultSets?.[0] ?? []) as unknown as Producto[];
}

export async function cambiarEstadoProducto(idProducto: number, idEstado: number): Promise<void> {
  await pool.query('CALL sp_cambiarEstado(?, ?)', [idProducto, idEstado]);
}

export async function agregarProducto(agregar: CrearProducto): Promise<void> {
  await pool.query('CALL sp_crearProducto(?, ?, ?, ?, ?, ?, ?, ?, ?)', [
    agregar.nombre,
    agregar.id_marca,
    agregar.id_categoria,
    agregar.descripcion,
    agregar.precio,
    agregar.stock,
    agregar.stock_min,
    agregar.stock_max,
    agregar.id_estado,
  ]);
}

export async function editarProducto(idProducto: number, producto: CrearProducto): Promise<void> {
  await pool.query('CALL sp_editarProducto(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
    idProducto,
    producto.nombre,
    producto.id_marca,
    producto.id_categoria,
    producto.descripcion,
    producto.precio,
    producto.stock,
    producto.stock_min,
    producto.stock_max,
    producto.id_estado,
  ]);
}

