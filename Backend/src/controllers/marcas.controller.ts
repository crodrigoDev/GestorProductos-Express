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

export async function editarMarcaControlador(req: Request, res: Response) {
  try {
    await catalogFacade.editarMarca(Number(req.params.id), req.body.detalle);
    res.json({ message: 'Marca actualizada' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function obtenerMarcaPorIdControlador(req: Request, res: Response) {
  try {
    const marca = await catalogFacade.obtenerMarcaPorId(Number(req.params.id));
    if (!marca) return res.status(404).json({ error: 'Marca no encontrada' });
    res.json(marca);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
