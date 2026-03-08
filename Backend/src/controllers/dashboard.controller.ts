import { Request, Response } from 'express';
import { catalogFacade } from '../facades/catalog.facade';

export async function obtenerResumenControlador(_req: Request, res: Response) {
  try {
    const resumen = await catalogFacade.obtenerResumen();
    res.json(resumen);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function obtenerUltimaActividadControlador(_req: Request, res: Response) {
  try {
    const actividad = await catalogFacade.obtenerUltimaActividad();
    res.json(actividad);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function obtenerProductosPorCategoriaControlador(_req: Request, res: Response) {
  try {
    const data = await catalogFacade.obtenerProductosPorCategoria();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function obtenerProductosPorMarcaControlador(_req: Request, res: Response) {
  try {
    const data = await catalogFacade.obtenerProductosPorMarca();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function obtenerProductosPorEstadoControlador(_req: Request, res: Response) {
  try {
    const data = await catalogFacade.obtenerProductosPorEstado();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
