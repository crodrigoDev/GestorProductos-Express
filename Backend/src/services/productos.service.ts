import { RowDataPacket } from 'mysql2';
import { pool } from '../config/database';

export type FiltrosProducto = {
  estado: number | null;
  marca: number | null;
  categoria: number | null;
};

export type FilaProducto = {
  id: number;
  nombre: string;
  id_marca: number;
  marca: string;
  id_categoria: number;
  categoria: string;
  descripcion: string;
  precio: number;
  stock: number;
  stock_min: number;
  stock_max: number;
  id_estado: number;
  estado: string;
  fecha_creacion: string;
  fecha_actualizacion: string | null;
};
export async function listarProductos(filters: FiltrosProducto): Promise<FilaProducto[]> {
  const [resultSets] = await pool.query<RowDataPacket[][]>(
    'CALL sp_listarProductosFiltro(?, ?, ?)',
    [filters.estado, filters.marca, filters.categoria]
  );

  return (resultSets?.[0] ?? []) as unknown as FilaProducto[];
}

export async function cambiarEstadoProducto(idProducto: number, idEstado: number): Promise<void> {
  await pool.query('CALL sp_cambiarEstado(?, ?)', [idProducto, idEstado]);
}

export type ProductFilters = FiltrosProducto;
export type ProductRow = FilaProducto;
