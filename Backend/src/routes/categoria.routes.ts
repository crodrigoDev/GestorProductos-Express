import { Router } from 'express';
import {
  listarCategoriasControlador,
  listarCategoriasConTotalControlador,
  crearCategoriaControlador,
  editarCategoriaControlador,
} from '../controllers/categorias.controller';

const categoriaRouter = Router();

categoriaRouter.get('/', listarCategoriasControlador);
categoriaRouter.get('/con-count', listarCategoriasConTotalControlador);
categoriaRouter.post('/', crearCategoriaControlador);
categoriaRouter.put('/:id', editarCategoriaControlador);

export { categoriaRouter };