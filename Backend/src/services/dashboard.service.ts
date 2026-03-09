import { getConnection } from '../config/database';
import type { DashboardResumen, UltimaActividad, UltimaCreacion ,ProductosPorCategoria, ProductosPorMarca, ProductosPorEstado } from '../types';

export async function obtenerResumen(): Promise<DashboardResumen> {
  const [rows] = await getConnection().query('CALL sp_dashboardResumen()');
  return ((rows as unknown[][])?.[0]?.[0] ?? {}) as DashboardResumen;
}

export async function obtenerUltimaActividad(): Promise<UltimaActividad[]> {
  const [rows] = await getConnection().query('CALL sp_dashboardUltimaActividad()');
  return ((rows as unknown[][])?.[0] ?? []) as UltimaActividad[];
}

export async function obtenerProductosPorCategoria(): Promise<ProductosPorCategoria[]> {
  const [rows] = await getConnection().query('CALL sp_dashboardProductosPorCategoria()');
  return ((rows as unknown[][])?.[0] ?? []) as ProductosPorCategoria[];
}

export async function obtenerProductosPorMarca(): Promise<ProductosPorMarca[]> {
  const [rows] = await getConnection().query('CALL sp_dashboardProductosPorMarca()');
  return ((rows as unknown[][])?.[0] ?? []) as ProductosPorMarca[];
}

export async function obtenerProductosPorEstado(): Promise<ProductosPorEstado[]> {
  const [rows] = await getConnection().query('CALL sp_dashboardProductosPorEstado()');
  return ((rows as unknown[][])?.[0] ?? []) as ProductosPorEstado[];
}

export async function obtenerUltimaCreacion(): Promise<UltimaCreacion[]> {
  const[rows] = await getConnection().query('Call sp_dashboardUltimaCreacion()');
  return ((rows as unknown[][])?.[0] ?? [] ) as UltimaCreacion[];
}
