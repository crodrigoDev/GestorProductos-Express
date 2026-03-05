import { RowDataPacket } from 'mysql2';
import { pool } from '../config/database';

export type Categoria = {
    id: number;
    nombre: string;
}

export async function listarCategoria(): Promise<Categoria[]> {
    const [resultSets] = await pool.query<RowDataPacket[][]>(
        'CALL sp_listarCategoria()'
    );
  
    return (resultSets?.[0] ?? []) as unknown as Categoria[];
}
