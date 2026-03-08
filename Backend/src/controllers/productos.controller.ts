import { Request, Response } from 'express';
import { catalogFacade } from '../facades/catalog.facade';

export async function listarProductosControlador(req: Request, res: Response) {
  try {
    const productos = await catalogFacade.listarProductos({
      estado: req.query.estado ? Number(req.query.estado) : null,
      marca: req.query.marca ? Number(req.query.marca) : null,
      categoria: req.query.categoria ? Number(req.query.categoria) : null,
    });
    res.json(productos);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function agregarProductoControlador(req: Request, res: Response) {
  try {
    await catalogFacade.crearProducto(req.body);
    res.status(201).json({ message: 'Producto creado' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function editarProductoControlador(req: Request, res: Response) {
  try {
    await catalogFacade.editarProducto(Number(req.params.id), req.body);
    res.json({ message: 'Producto actualizado' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function cambiarEstadoProductoControlador(req: Request, res: Response) {
  try {
    await catalogFacade.cambiarEstado(Number(req.params.id), req.body.id_estado);
    res.json({ message: 'Estado actualizado' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function eliminarProductoControlador(req: Request, res: Response) {
  try {
    await catalogFacade.eliminarProducto(Number(req.params.id));
    res.json({ message: 'Producto eliminado' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function obtenerProductoPorIdControlador(req: Request, res: Response) {
  try {
    const producto = await catalogFacade.obtenerProductoPorId(Number(req.params.id));
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(producto);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
