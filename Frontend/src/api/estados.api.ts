import type { Estado } from '../types/estados';
import { getJson } from './http';

export function listarEstados(signal?: AbortSignal): Promise<Estado[]> {
  return getJson<Estado[]>('/api/estados', signal);
}
