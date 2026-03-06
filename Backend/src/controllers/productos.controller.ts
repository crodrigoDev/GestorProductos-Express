import { Request, Response } from 'express';
import { catalogFacade } from '../facades/catalog.facade';
import type { FiltrosProducto } from '../services/productos.service';

function parsearEnteroOpcional(valor: unknown): number | null {
  if (valor === undefined || valor === null || valor === '') {
    return null;
  }

  const numero = Number(valor);
  if (!Number.isInteger(numero) || numero <= 0) {
    return null;
  }

  return numero;
}

export async function listarProductosControlador(req: Request, res: Response) {
  const filtros: FiltrosProducto = {
    estado: parsearEnteroOpcional(req.query.estado),
    marca: parsearEnteroOpcional(req.query.marca),
    categoria: parsearEnteroOpcional(req.query.categoria),
  };

  try {
    const productos = await catalogFacade.listProducts(filtros);
    res.json(productos);
  } catch (error) {
    res.status(500).json({
      message: 'No se pudo listar productos',
      detail: error instanceof Error ? error.message : 'Error desconocido',
    });
  }
}

export async function cambiarEstadoProductoControlador(req: Request, res: Response) {
  const idProducto = Number(req.params.id);
  const idEstado = Number(req.body.id_estado);

  if (!Number.isInteger(idProducto) || idProducto <= 0) {
    res.status(400).json({ message: 'ID de producto invalido' });
    return;
  }

  if (!Number.isInteger(idEstado) || idEstado <= 0) {
    res.status(400).json({ message: 'ID de estado invalido' });
    return;
  }

  try {
    await catalogFacade.changeProductStatus(idProducto, idEstado);
    res.json({ ok: true, message: 'Estado actualizado' });
  } catch (error) {
    res.status(500).json({
      message: 'No se pudo cambiar el estado del producto',
      detail: error instanceof Error ? error.message : 'Error desconocido',
    });
  }
}
