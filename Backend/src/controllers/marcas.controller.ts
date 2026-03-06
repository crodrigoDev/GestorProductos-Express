import { Request, Response } from 'express';
import { catalogFacade } from '../facades/catalog.facade';

export async function listarMarcasControlador(_req: Request, res: Response) {
  try {
    const marcas = await catalogFacade.listBrands();
    res.json(marcas);
  } catch (error) {
    res.status(500).json({
      message: 'No se pudo listar marcas',
      detail: error instanceof Error ? error.message : 'Error desconocido',
    });
  }
}

export async function listarMarcasConTotalControlador(_req: Request, res: Response) {
  try {
    const marcas = await catalogFacade.listBrandsWithCount();
    res.json(marcas);
  } catch (error) {
    res.status(500).json({
      message: 'No se pudo listar marcas con count',
      detail: error instanceof Error ? error.message : 'Error desconocido',
    });
  }
}
