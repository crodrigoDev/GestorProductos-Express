import { Request, Response } from 'express';
import { catalogFacade } from '../facades/catalog.facade';

export async function listarCategoriasControlador(_req: Request, res: Response) {
  try {
    const categorias = await catalogFacade.listarCategorias();
    res.json(categorias);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function listarCategoriasConTotalControlador(_req: Request, res: Response) {
  try {
    const categorias = await catalogFacade.listarCategoriasConCount();
    res.json(categorias);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function crearCategoriaControlador(req: Request, res: Response) {
  try {
    await catalogFacade.crearCategoria(req.body.detalle);
    res.status(201).json({ message: 'Categoria creada' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function editarCategoriaControlador(req: Request, res: Response) {
  try {
    await catalogFacade.editarCategoria(Number(req.params.id), req.body.detalle);
    res.json({ message: 'Categoria actualizada' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
