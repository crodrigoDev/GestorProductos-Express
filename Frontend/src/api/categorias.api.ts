import type { Categorias, CategoriasConCount } from '../types/categorias';
import { getJson } from './http';

export function listarCategorias(signal?: AbortSignal): Promise<Categorias[]> {
  return getJson<Categorias[]>('/api/categorias', signal);
}

export function listarCategoriasConTotal(signal?: AbortSignal): Promise<CategoriasConCount[]> {
  return getJson<CategoriasConCount[]>('/api/categorias/con-count', signal);
}

export const getCategorias = listarCategorias;
export const getCategoriasConCount = listarCategoriasConTotal;
