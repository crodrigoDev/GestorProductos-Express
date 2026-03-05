import { RowDataPacket } from 'mysql2';
import { pool } from '../config/database';

export type ProductFilters = {
  estado: number | null;
  marca: number | null;
  categoria: number | null;
};

export type ProductRow = {
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
export async function listProducts(filters: ProductFilters): Promise<ProductRow[]> {
  const [resultSets] = await pool.query<RowDataPacket[][]>(
    'CALL sp_listarProductosFiltro(?, ?, ?)',
    [filters.estado, filters.marca, filters.categoria]
  );

  return (resultSets?.[0] ?? []) as unknown as ProductRow[];
}
