import { Router } from 'express';
import {
  listarCategoriasControlador,
  listarCategoriasConTotalControlador,
  crearCategoriaControlador,
  editarCategoriaControlador,
  obtenerCategoriaPorIdControlador,
} from '../controllers/categorias.controller';

const categoriaRouter = Router();

categoriaRouter.get('/', listarCategoriasControlador);
categoriaRouter.get('/con-count', listarCategoriasConTotalControlador);
categoriaRouter.get('/:id', obtenerCategoriaPorIdControlador);
categoriaRouter.post('/', crearCategoriaControlador);
categoriaRouter.put('/:id', editarCategoriaControlador);

export { categoriaRouter };