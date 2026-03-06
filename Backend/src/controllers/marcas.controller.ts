import { Request, Response } from 'express';
import { catalogFacade } from '../facades/catalog.facade';

export async function listarMarcasControlador(_req: Request, res: Response) {
  try {
    const marcas = await catalogFacade.listarMarcas();
    res.json(marcas);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function listarMarcasConTotalControlador(_req: Request, res: Response) {
  try {
    const marcas = await catalogFacade.listarMarcasConCount();
    res.json(marcas);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function crearMarcaControlador(req: Request, res: Response) {
  try {
    await catalogFacade.crearMarca(req.body.detalle);
    res.status(201).json({ message: 'Marca creada' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
