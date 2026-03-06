import { callList, callVoid } from '../config/database';
import type { Marca, MarcaConCount } from '../types';

export const listarMarcas = () => callList<Marca>('sp_listarMarcas()');

export const listarMarcasConCount = () => callList<MarcaConCount>('sp_listarMarcasContar()');

export const crearMarca = (detalle: string) => callVoid('sp_crearMarca(?)', [detalle]);

export const editarMarca = (id: number, detalle: string) => callVoid('sp_editarMarca(?, ?)', [id, detalle]);
