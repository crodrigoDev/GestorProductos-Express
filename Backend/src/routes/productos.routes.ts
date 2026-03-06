import { Router } from 'express';
import {
	listarProductosControlador,
	cambiarEstadoProductoControlador,
	agregarProductoControlador,
	editarProductoControlador,
	eliminarProductoControlador,
} from '../controllers/productos.controller';

const productosRouter = Router();

productosRouter.get('/', listarProductosControlador);
productosRouter.post('/', agregarProductoControlador);
productosRouter.put('/:id', editarProductoControlador);
productosRouter.delete('/:id', eliminarProductoControlador);
productosRouter.patch('/:id/estado', cambiarEstadoProductoControlador);

export { productosRouter };
