import { callList, callVoid } from '../config/database';
import type { Categoria, CategoriaConCount } from '../types';

export const listarCategoria = () => callList<Categoria>('sp_listarCategoria()');

export const listarCategoriaConCount = () => callList<CategoriaConCount>('sp_listarCategoriaContar()');

export const crearCategoria = (detalle: string) => callVoid('sp_crearCategoria(?)', [detalle]);

export const editarCategoria = (id: number, detalle: string) => callVoid('sp_editarCategoria(?, ?)', [id, detalle]);
