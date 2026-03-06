import { RowDataPacket } from 'mysql2';
import { pool } from '../config/database';
import type { Categoria, CategoriaConCount } from '../types';

export async function listarCategoria(): Promise<Categoria[]> {
    const [resultSets] = await pool.query<RowDataPacket[][]>(
        'CALL sp_listarCategoria()'
    );

    return (resultSets?.[0] ?? []) as unknown as Categoria[];
}

export async function listarCategoriaConCount(): Promise<CategoriaConCount[]> {
    const [resultSets] = await pool.query<RowDataPacket[][]>(
        'CALL sp_listarCategoriaContar()'
    );

    return (resultSets?.[0] ?? []) as unknown as CategoriaConCount[];
}

export async function crearCategoria(detalle: string): Promise<void> {
    await pool.query('CALL sp_crearCategoria(?)', [detalle]);
}
