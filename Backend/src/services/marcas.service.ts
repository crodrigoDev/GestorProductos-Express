import { RowDataPacket } from 'mysql2';
import { pool } from '../config/database';

export type Marca = {
    id: number;
    detalle: string;
}

export type MarcaConCount = {
    id: number;
    detalle: string;
    total_productos: number;
    fecha_creacion: string;
    fecha_actualizacion: string | null;
}

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
