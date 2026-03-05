import type { Productos } from '../types/productos';
import { getJson } from './http';

export function getProductos(signal?: AbortSignal): Promise<Productos[]> {
  return getJson<Productos[]>('/api/productos', signal);
}
