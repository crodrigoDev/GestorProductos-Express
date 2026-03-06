import { RowDataPacket } from 'mysql2';
import { pool } from '../config/database';

export type Categoria = {
    id: number;
    detalle: string;
}

export type CategoriaConCount = {
    id: number;
    detalle: string;
    total_productos: number;
    fecha_creacion: string;
    fecha_actualizacion: string | null;
}

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
