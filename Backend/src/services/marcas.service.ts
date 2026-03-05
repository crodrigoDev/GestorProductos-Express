import { RowDataPacket } from 'mysql2';
import { pool } from '../config/database';

export type Marcas = {
    id: number;
    nombre: string;
}

export async function listarMarcas(): Promise<Marcas[]> {
    const [resultSets] = await pool.query<RowDataPacket[][]>(
        'CALL sp_listarMarcas()'
    );
  
    return (resultSets?.[0] ?? []) as unknown as Marcas[];
}
