import { Router } from 'express';
import {
  listarCategoriasControlador,
  listarCategoriasConTotalControlador,
  crearCategoriaControlador,
} from '../controllers/categorias.controller';

const categoriaRouter = Router();

categoriaRouter.get('/', listarCategoriasControlador);
categoriaRouter.get('/con-count', listarCategoriasConTotalControlador);
categoriaRouter.post('/', crearCategoriaControlador);

export { categoriaRouter };