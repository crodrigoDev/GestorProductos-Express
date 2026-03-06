import { Request, Response } from 'express';
import { catalogFacade } from '../facades/catalog.facade';

export async function listarCategoriasControlador(_req: Request, res: Response) {
  try {
    const categorias = await catalogFacade.listCategories();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({
      message: 'No se pudo listar categorias',
      detail: error instanceof Error ? error.message : 'Error desconocido',
    });
  }
}

export async function listarCategoriasConTotalControlador(_req: Request, res: Response) {
  try {
    const categorias = await catalogFacade.listCategoriesWithCount();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({
      message: 'No se pudo listar categorias con count',
      detail: error instanceof Error ? error.message : 'Error desconocido',
    });
  }
}
