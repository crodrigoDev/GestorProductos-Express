import type { Marcas, MarcasConCount } from '../types/marcas';
import { getJson } from './http';

export function listarMarcas(signal?: AbortSignal): Promise<Marcas[]> {
  return getJson<Marcas[]>('/api/marcas', signal);
}

export function listarMarcasConTotal(signal?: AbortSignal): Promise<MarcasConCount[]> {
  return getJson<MarcasConCount[]>('/api/marcas/con-count', signal);
}

export const getMarcas = listarMarcas;
export const getMarcasConCount = listarMarcasConTotal;
