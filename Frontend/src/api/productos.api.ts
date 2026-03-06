import type { Productos } from '../types/productos';
import { getJson } from './http';

export type ProductosFiltros = {
  estado?: number | null;
  marca?: number | null;
  categoria?: number | null;
};

export function listarProductos(signal?: AbortSignal, filtros?: ProductosFiltros): Promise<Productos[]> {
  const params = new URLSearchParams();
  if (filtros?.estado) params.append('estado', String(filtros.estado));
  if (filtros?.marca) params.append('marca', String(filtros.marca));
  if (filtros?.categoria) params.append('categoria', String(filtros.categoria));

  const query = params.toString();
  return getJson<Productos[]>(`/api/productos${query ? `?${query}` : ''}`, signal);
}

export async function cambiarEstadoProducto(idProducto: number, idEstado: number): Promise<void> {
  const response = await fetch(`http://localhost:3000/api/productos/${idProducto}/estado`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id_estado: idEstado }),
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: no se pudo cambiar estado`);
  }
}

export const getProductos = listarProductos;
