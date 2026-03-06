import { Router } from 'express';
import {
	listarProductosControlador,
	cambiarEstadoProductoControlador,
	agregarProductoControlador,
	editarProductoControlador,
} from '../controllers/productos.controller';

const productosRouter = Router();

productosRouter.get('/', listarProductosControlador);
productosRouter.post('/', agregarProductoControlador);
productosRouter.put('/:id', editarProductoControlador);
productosRouter.patch('/:id/estado', cambiarEstadoProductoControlador);

export { productosRouter };
