import type { Marcas } from '../types/marcas';
import { getJson } from './http';

export function getMarcas(signal?: AbortSignal): Promise<Marcas[]> {
  return getJson<Marcas[]>('/api/marcas', signal);
}
