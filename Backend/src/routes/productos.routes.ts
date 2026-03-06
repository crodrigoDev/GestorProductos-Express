import { Router } from 'express';
import {
	listarProductosControlador,
	cambiarEstadoProductoControlador,
} from '../controllers/productos.controller';

const productosRouter = Router();

productosRouter.get('/', listarProductosControlador);
productosRouter.patch('/:id/estado', cambiarEstadoProductoControlador);

export { productosRouter };
