import { RowDataPacket } from 'mysql2';
import { pool } from '../config/database';
import type { Marca, MarcaConCount } from '../types';

export async function listarMarcas(): Promise<Marca[]> {
    const [resultSets] = await pool.query<RowDataPacket[][]>(
        'CALL sp_listarMarcas()'
    );

    return (resultSets?.[0] ?? []) as unknown as Marca[];
}

export async function listarMarcasConCount(): Promise<MarcaConCount[]> {
    const [resultSets] = await pool.query<RowDataPacket[][]>(
        'CALL sp_listarMarcasContar()'
    );

    return (resultSets?.[0] ?? []) as unknown as MarcaConCount[];
}

export async function crearMarca(detalle: string): Promise<void> {
    await pool.query('CALL sp_crearMarca(?)', [detalle]);
}
