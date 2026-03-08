import { Router } from 'express';
import {
	listarProductosControlador,
	cambiarEstadoProductoControlador,
	agregarProductoControlador,
	editarProductoControlador,
	eliminarProductoControlador,
	obtenerProductoPorIdControlador,
} from '../controllers/productos.controller';

const productosRouter = Router();

productosRouter.get('/', listarProductosControlador);
productosRouter.get('/:id', obtenerProductoPorIdControlador);
productosRouter.post('/', agregarProductoControlador);
productosRouter.put('/:id', editarProductoControlador);
productosRouter.delete('/:id', eliminarProductoControlador);
productosRouter.patch('/:id/estado', cambiarEstadoProductoControlador);

export { productosRouter };
