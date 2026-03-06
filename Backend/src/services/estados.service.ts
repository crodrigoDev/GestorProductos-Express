import { callList } from '../config/database';
import type { Estado } from '../types';

export const listarEstados = () => callList<Estado>('sp_listarEstados()');
