import { Request, Response } from 'express';
import { catalogFacade } from '../facades/catalog.facade';

export async function listarEstadosControlador(_req: Request, res: Response) {
  try {
    const estados = await catalogFacade.listarEstados();
    res.json(estados);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
