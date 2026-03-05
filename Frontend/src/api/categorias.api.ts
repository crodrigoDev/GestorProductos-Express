import type { Categorias } from '../types/categorias';
import { getJson } from './http';

export function getCategorias(signal?: AbortSignal): Promise<Categorias[]> {
  return getJson<Categorias[]>('/api/categorias', signal);
}
