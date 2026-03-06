import { Request, Response } from 'express';
import { catalogFacade } from '../facades/catalog.facade';

export async function listarEstadosControlador(_req: Request, res: Response) {
  try {
    const estados = await catalogFacade.listStates();
    res.json(estados);
  } catch (error) {
    res.status(500).json({
      message: 'No se pudo listar estados',
      detail: error instanceof Error ? error.message : 'Error desconocido',
    });
  }
}
